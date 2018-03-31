// connect to NASA api for today's NEOs
// display selected information to UI
// visually differentiate potentialy hazardous NEOs

let today = formatDate(new Date());

let url = 'https://api.nasa.gov/neo/rest/v1/feed/today?api_key=v5RFC0BvhWX1dRLupQt3ykxykp0OXc5ULq4OFozA'

$.ajax({
  url: url,
  success: function (results) {
    let neos = results.near_earth_objects[today];
    let neoList = [];
    for (var i = 0; i < neos.length; i++) {
      neoList.push({
        name: neos[i].name,
        maxDiameter: neos[i].estimated_diameter.meters.estimated_diameter_max,
        potentialHazard: neos[i].is_potentially_hazardous_asteroid,
        missDistance: neos[i].close_approach_data[0].miss_distance.kilometers,
        absoluteMagnitude: neos[i].absolute_magnitude_h
      });
    }
    displayNeos(neoList);
  },
  error: function (error) { console.log(error); }
});

function displayNeos(neoList) {
  $('.title').prepend(neoList.length);
  
  for (neo in neoList) {
    $('.asteroidList').append('<li>' + neoList[neo].name + '<br>' +
    neoList[neo].absoluteMagnitude + '<br>' +
    neoList[neo].maxDiameter  + '<br>' +
    neoList[neo].missDistance  + '</li>')

    if (neoList[neo].potentialHazard) {
      $('li').css('border-color', 'red');
    }
  }
}


function formatDate(today) {
  let year = today.getFullYear();

  let month = today.getMonth() + 1;
  if (month < 10) month = '0' + month;

  let day = today.getDate();
  if (day < 10) day = '0' + day;

  return year + '-' + month + '-' + + day;
}

