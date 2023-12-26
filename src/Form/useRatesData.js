import { useEffect, useState } from "react";

export const useRatesData = () => {
  const [ratesData, setRatesData] = useState({ success: "loading" });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          "https://api.currencyapi.com/v3/latest?apikey=cur_live_H22cRxqJXhrapwztireTdTdMjbhrkl78Z507fGPh&currencies=EUR%2CUSD%2CCAD%2CJPY%2CGBP&base_currency=PLN"
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const { meta, data } = await response.json();

        setRatesData({
          success: true,
          meta,
          data,
        });
      } catch {
        setRatesData({
          success: false,
        });
      }
    };

    const timeoutId = setTimeout(fetchRates, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return ratesData;
};
