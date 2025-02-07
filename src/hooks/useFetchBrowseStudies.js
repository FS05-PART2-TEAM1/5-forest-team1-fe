import axiosClient from "@/api/axios";
import { useEffect, useState } from "react";

const useFetchBrowseStudies = (initialParams) => {
  const [studies, setStudies] = useState({
    studies: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,
  });
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    const fetchStudies = async () => {
      const response = await axiosClient.get("/api/studies", { params });
      setStudies({ ...response.data });
    };

    fetchStudies();
  }, [params]);

  return [studies, setParams];
};

export default useFetchBrowseStudies;
