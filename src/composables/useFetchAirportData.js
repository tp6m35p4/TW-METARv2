import { useAxios } from '@vueuse/integrations/useAxios';
import { metarUrl, windyNotamUrl } from '../stores/url';
import { useAirportsData } from '../stores/airports';
import { parse } from '../helpers/notamParser';
function getAirportDataById(id, d) {
  let fData = d.filter((airport) => airport.StationID == id);
  return fData.length > 0 ? fData[0] : undefined;
}
export const useFetchAirportMetar = async (airportId) => {
  const { data, isFinished } = await useAxios(metarUrl);
  console.log(data);
  if (isFinished) {
    for (let i in airportList) {
      let d = getAirportDataById(airportList[i], data.value);
      if (d) {
        airports.data[airportList[i]] = d;
      }
    }
  }
};
export const useFetchAirportMetarCache = async (airportId) => {
  const { data } = await useFetchAirportMetar(airportId);
};

export const useFetchAirportMetarInit = async () => {
  const airportsData = useAirportsData();
  const { data, isFinished } = await useAxios(metarUrl);
  if (isFinished) {
    for (let i in airportsData.$state) {
      let d = getAirportDataById(i, data.value);
      if (d) {
        airportsData[i]['IATA'] = d['AirportID'];
        airportsData[i]['AirportName'] = d['AirportName'];
        airportsData[i]['metar'] = d;
        airportsData[i]['checkTime'] = Date.now().toString();
      }
    }
  }
};
export const useFetchAirportNotam = async (airportId) => {
  const airportsData = useAirportsData();

  const { data, isFinished } = await useAxios(`${windyNotamUrl}/${airportId}`);
  if (isFinished) {
    airportsData[airportId]['notam'] = [];
    data.value.forEach((e) => {
      let fromTo = e['fromTo'].split('-');
      let from = fromTo[0];
      let to = fromTo[1];
      let n = parse(e['raw']);
      airportsData[airportId]['notam'].push({
        id: e['id'],
        validity: e['validity'],
        validityStr: e['validityStr'],
        from,
        to,
        raw: e['raw'],
        body: e['body'],
        parsed: n,
      });
    });
  }
};
