// connect to NASA api for today's NEOs
// display selected information to UI
// visually differentiate potentialy hazardous NEOs

let today = formatDate(new Date());
let url = 'https://api.nasa.gov/neo/rest/v1/feed/today?api_key=v5RFC0BvhWX1dRLupQt3ykxykp0OXc5ULq4OFozA'

$.ajax({
  url: url,
  success: function (results) {

    let previous = results.links.prev;
    let next = results.links.next;

    let neos = results.near_earth_objects[today];
    let neoList = [];

    for (let i in neos) {
      neoList.unshift({
        name: neos[i].name,
        link: neos[i].nasa_jpl_url,
        maxDiameter: neos[i].estimated_diameter.meters.estimated_diameter_max,
        potentialHazard: neos[i].is_potentially_hazardous_asteroid,
        missDistance: neos[i].close_approach_data[0].miss_distance.kilometers,
        absoluteMagnitude: neos[i].absolute_magnitude_h
      });
    }
    links(previous, next);
    displayNeos(neoList);
  },
  error: function (error) { console.log(error); }
});

function formatDate(dateObject) {
  let year = dateObject.getFullYear();

  let month = dateObject.getMonth() + 1;
  if (month < 10) month = '0' + month;

  let day = dateObject.getDate();
  if (day < 10) day = '0' + day;

  return year + '-' + month + '-' + day;
}

function displayNeos(neoList) {
  $('.title').prepend(neoList.length);
  $('.title').append(today);

  for (neo in neoList) {
    console.log(neoList[neo].link);
    $('.asteroidList').append('<li><a target="_blank" href="' + neoList[neo].link + ';old=0;orb=1;cov=0;log=0;cad=0#orb">' + neoList[neo].name + '</a><br>' +
      'Mag: ' + displayNumbers(neoList[neo].absoluteMagnitude) + '<br>' +
      'Diameter: ' + displayNumbers(neoList[neo].maxDiameter) + '<br>' +
      'Distance: ' + displayNumbers(neoList[neo].missDistance) + '</li>')

    if (neoList[neo].potentialHazard) {
      $('li').css('border-color', 'red');
    }
  }
}

function displayNumbers(n) {
  let digits = n.toString().split('.');

  if (digits[0].length > 3) {
    let int = digits[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    n = int;
  }
  return n;
}

function links(previous, next) {
  $('.otherDays').append(
    '<a href = "' + previous + '"><-</a> TIME <a href = "' + next + '">-></a>'
  );
}
