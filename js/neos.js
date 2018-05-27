// connect to NASA api for today's NEOs
// display selected information to UI
// visually differentiate potentialy hazardous NEOs

let today = formatDate(new Date());
let day = '2018-05-28';
console.log(today, typeof today, day, typeof day);
let apiKey = 'v5RFC0BvhWX1dRLupQt3ykxykp0OXc5ULq4OFozA';
// let url = 'https://api.nasa.gov/neo/rest/v1/feed/today?api_key=' + apiKey;
let url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + day + '&end_date=' + today + '&detailed=false&api_key=' + apiKey;
let abMag = [];


$.ajax({
  url: url,
  success: function (results) {

    let previous = results.links.prev;
    let next = results.links.next;

    let neos = results.near_earth_objects[today];
    let neoList = [];

    for (let i in neos) {
      abMag.push(neos[i].absolute_magnitude_h);
      neoList.unshift({
        name: neos[i].name,
        link: neos[i].nasa_jpl_url,
        maxDiameter: neos[i].estimated_diameter.meters.estimated_diameter_max,
        potentialHazard: neos[i].is_potentially_hazardous_asteroid,
        missDistance: neos[i].close_approach_data[0].miss_distance.kilometers,
        absoluteMagnitude: neos[i].absolute_magnitude_h,
        orbitingBody: neos[i].close_approach_data[0].orbiting_body
      });
    }
    displayNeos(neoList);
    links(previous, next);
    console.log(abMag);
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
    $('.neoList').append('<li><br><a target="_blank" href="' + neoList[neo].link + ';old=0;orb=1;cov=0;log=0;cad=0#orb">' + neoList[neo].name + '</a><br>' +
      'H: ' + displayNumbers(neoList[neo].absoluteMagnitude) + ' mag<br>' +
      'Diam: ' + displayNumbers(neoList[neo].maxDiameter) + ' m<br>' +
      'Dist: ' + displayNumbers(neoList[neo].missDistance) + ' km<br>' +
      'Orbiting: ' + neoList[neo].orbitingBody + '</li>')
    if (neoList[neo].potentialHazard) {
      $('li').css('border-color', 'red');
    }
  }
}

function displayNumbers(n) {
  let digits = n.toString().split('.');
  let int = digits[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  if (digits[1]) int += '.' + digits[1].toString().substring(0, 3);
  return int;
}

function links(next) {
  $('.otherDays').append(
    'TIME <a href = "' + next + '">-></a>'
  );
}