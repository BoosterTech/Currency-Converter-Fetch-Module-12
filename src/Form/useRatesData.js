import { useEffect, useState } from "react";

export const useRatesData = () => {
  const [ratesData, setRatesData] = useState({ success: "loading" });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          "https://api.currencyapi.com/v3/latest?apikey=cur_live_H22cRxqJXhrapwztireTdTdMjbhrkl78Z507fGPh&currencies=USD%2CEUR%2CJPY%2CGBP%2CAUD%2CCAD%2CCHF%2CCNY%2CSEK%2CNZD%2CHKD%2CNOK%2CKRW%2CTRY%2CMXN%2CSGD%2CINR%2CRUB%2CZAR%2CBRL%2CAED%2CPHP%2CDKK%2CPLN%2CTHB%2CIDR%2CHUF%2CSAR%2CMYR%2CCZK%2CCLP%2CILS%2CCOP%2CEGP%2CTWD%2CARS%2CVND%2CUAH%2CNGN%2CKES%2CPKR%2CIQD&base_currency=PLN"
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
