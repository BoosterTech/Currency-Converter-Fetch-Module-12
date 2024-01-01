import { useEffect, useState } from "react";
import { fetchRates } from "./api";

export const useRatesData = () => {
  const [ratesData, setRatesData] = useState({ state: "loading" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRates();

      setRatesData(data);
    };

    const timeoutId = setTimeout(fetchData, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return ratesData;
};
