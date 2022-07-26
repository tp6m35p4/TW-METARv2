import { useAirportsData } from '../stores/airports';
import { useFetchAirportNotam } from './fetchAirportData';
export const useRefreshNotam = async (airportId) => {
  const airportsData = useAirportsData();

  if (
    !airportsData[airportId]['notam'] ||
    Date.now() - (airportsData[airportId]['notam']?.['updatedAt'] ?? 0) >
      86400000 // 1 day
  ) {
    // console.log(
    //   `update NOTAM of ${airportId}, due to expired. (${
    //     Date.now() - (airportsData[airportId]['notam']?.['updatedAt'] ?? 0)
    //   }ms)`
    // );
    console.log(`fetch notam of ${airportId}`);
    await useFetchAirportNotam(airportId);
  }
};
