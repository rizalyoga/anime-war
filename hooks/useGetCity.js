import { useState, useEffect } from "react";

export const useGetCity = () => {
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {
    const fetchDataCity = async () => {
      const response = await fetch(`https://materi-thrive-demo.vercel.app/api/city`);
      const data = await response.json();
      setDataCity(data);

      // console.log(dataCity);
    };

    fetchDataCity();
  }, []);

  return { dataCity };
};
