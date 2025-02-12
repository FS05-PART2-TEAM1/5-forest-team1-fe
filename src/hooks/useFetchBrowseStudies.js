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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchStudies = async () => {
      axiosClient
        .get("/api/studies", { params })
        .then((response) => {
          setTimeout(() => {
            setStudies({ ...response.data });
            setLoading(false);
          }, 400);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchStudies();
  }, [params]);

  return [studies, loading, error, setParams];
};

export default useFetchBrowseStudies;
