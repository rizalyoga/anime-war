import { useState, useEffect } from "react";
// Interface
import { CityData } from "@/components/pages/city/City"

export const useGetCity = () => {
  const [dataCity, setDataCity] = useState<CityData[]>([]);

  useEffect(() => {
    const fetchDataCity = async () => {
      const response = await fetch(`https://materi-thrive-demo.vercel.app/api/city`);
      const data = await response.json();
      setDataCity(data);
    };

    fetchDataCity();
  }, []);

  return { dataCity };
};
