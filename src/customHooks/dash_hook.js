import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./user_auth";

const useDashboardData = () => {
  const {accessToken} = useAuth()
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/app/metrics_summery", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        console.log(response)
        if (response.data.success) {
          setData(response.data.data);
          console.log(response.data.data)
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.log(err.message)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { data, loading, error };
};

export default useDashboardData;
