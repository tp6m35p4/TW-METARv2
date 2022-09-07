import { useAxios } from '@vueuse/integrations/useAxios';
import { metarUrl, tafUrl, windyNotamUrl } from '../stores/url';
import { useAirportsData } from '../stores/airports';
import { parse } from '../helpers/notamParser';
function getAirportDataById(id, d) {
  let fData = d.filter((airport) => airport.StationID == id);
  return fData.length > 0 ? fData[0] : undefined;
}

export const useFetchAirportMetar = async (airportId) => {
  console.log(airportId);
  const airportsData = useAirportsData();
  let iataId = airportsData[airportId]['IATA'];
  const { data, isFinished } = await useAxios(`${metarUrl}/${iataId}`, {
    params: {
      top: 30,
      format: 'JSON',
    },
  });
  if (isFinished) {
    airportsData[airportId]['metar'] = {
      data: data.value[0],
      updatedAt: Date.now(),
    };
  }
};
// export const useFetchAirportMetarCache = async (airportId) => {
//   const { data } = await useFetchAirportMetar(airportId);
// };

export const useFetchAirportMetarInit = async () => {
  const airportsData = useAirportsData();
  const { data, isFinished } = await useAxios(metarUrl, {
    params: {
      top: 30,
      format: 'JSON',
    },
  });
  if (isFinished) {
    for (let i in airportsData.$state) {
      let d = getAirportDataById(i, data.value);
      if (d) {
        airportsData[i]['IATA'] = d['AirportID'];
        airportsData[i]['AirportName'] = d['AirportName'];
        airportsData[i]['metar'] = {
          data: d,
          updatedAt: Date.now(),
        };
        airportsData[i]['checkTime'] = Date.now();
      }
    }
  }
};
export const useFetchAirportNotam = async (airportId) => {
  const airportsData = useAirportsData();

  const { data, isFinished } = await useAxios(`${windyNotamUrl}/${airportId}`);
  if (isFinished) {
    airportsData[airportId]['notam'] = {
      data: [],
      updatedAt: Date.now(),
    };
    data.value.forEach((e) => {
      let fromTo = e['fromTo'].split('-');
      let from = fromTo[0];
      let to = fromTo[1];
      let n = parse(e['raw']);
      airportsData[airportId]['notam']['data'].push({
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

export const useFetchAirportTaf = async (airportId) => {
  const airportsData = useAirportsData();

  const { data, isFinished } = await useAxios(tafUrl, {
    params: {
      stationString: airportId,
    },
  });
  if (isFinished) {
    airportsData[airportId]['taf'] = data;
  }
};
