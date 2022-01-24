const axios = require('axios');

module.exports = async function getData() {
  const a = await axios.get(
    'https://www.kayak.com/s/horizon/exploreapi/destinations?airport=THR&budget=&depart=20220124&return=20220128&duration=&exactDates=true&flightMaxStops=&stopsFilterActive=false&topRightLat=37.69751058611946&topRightLon=78.29572187500048&bottomLeftLat=33.62902557059839&bottomLeftLon=24.330878124999572&zoomLevel=4&selectedMarker=&themeCode=&selectedDestination='
  );
  const array = a.data;
  const result = [];
  array.forEach((element) => {
    result.push({
      date: '2022-06-23 18:55',
      air_line: 'Iran Air',
      origin_air_port: 'IKA',
      destination_air_port: 'IST',
      origin_city: 'Tehran',
      destination_city: 'Istanbul',
      flightnumber: 'IR769',
    });
  });
};
