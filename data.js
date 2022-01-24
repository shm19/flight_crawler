const axios = require('axios');

module.exports.getData = async () => {
  try {
    const a = await axios.get(
      'https://www.kayak.com/s/horizon/exploreapi/destinations?airport=THR&budget=&depart=20220124&return=20220128&duration=&exactDates=true&flightMaxStops=&stopsFilterActive=false&topRightLat=37.69751058611946&topRightLon=78.29572187500048&bottomLeftLat=33.62902557059839&bottomLeftLon=24.330878124999572&zoomLevel=4&selectedMarker=&themeCode=&selectedDestination='
    );
    const array = a.data.destinations;
    const result = [];
    array.forEach((element) => {
      result.push({
        // date: null,
        // air_line: null,
        // flightnumber: 'IR769',
        origin_air_port: element.originAirportShortName,
        destination_air_port: element.airport.shortName,
        origin_city: 'Tehran',
        destination_city: element.city.name,
        price: element.flightInfo.price,
      });
    });
    return result;
  } catch (error) {}
};
