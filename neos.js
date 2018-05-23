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
      neoList.push({
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
    $('.asteroidList').append('<li><a href="' + neoList[neo].link + '">' + neoList[neo].name + '</a><br>' +
      neoList[neo].absoluteMagnitude + '<br>' +
      neoList[neo].maxDiameter + '<br>' +
      neoList[neo].missDistance + '</li>')

    if (neoList[neo].potentialHazard) {
      $('li').css('border-color', 'red');
    }
  }
}

function links(previous, next) {
  $('.otherDays').append(
    '<a href = "' + previous + '"><-</a> TIME <a href = "' + next + '">-></a>'
  ); 
}