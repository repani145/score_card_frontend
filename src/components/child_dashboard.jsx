import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NumberCard from "../dashboard_components/number_card";
import TopScorers from "../dashboard_components/top_scorers";
import CombinedCircularGraph from "../dashboard_components/combined_circular_graph";
import './child_dashboard.css';
import { useAuth } from "../customHooks/user_auth";
import axios from "axios";

const ChildDashboard = () => {
    const { accessToken } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!accessToken) return; // Prevent API call if token is missing

            try {
                const response = await axios.get("http://127.0.0.1:8000/app/metrics_summery", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.data.success) {
                    setData(response.data.data);
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [accessToken]); // Add accessToken as dependency

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No data available</p>;

    return (
        <div className="container overflow-scroll" style={{ background: 'linear-gradient(to bottom right, #f0f0f0, #d9d9d9)' }}>
            {/* Row 2 */}
            <div className="row my-3">
                <div className="col-md-3 mb-1">
                    <div className="scale-card">
                        <NumberCard title={'Total Score'} numbar={data?.average_total_score || 0} numberColor="#FFD700" />
                    </div>
                </div>
                <div className="col-md-3 mb-1">
                    <div className="card scale-card">
                        <NumberCard title={'Productivity'} numbar={data?.category_breakdown?.productivity || 0} numberColor="#28a745" />
                    </div>
                </div>
                <div className="col-md-3 mb-1">
                    <div className="card scale-card">
                        <NumberCard title={'Quality'} numbar={data?.category_breakdown?.quality || 0} numberColor="#6c757d" />
                    </div>
                </div>
                <div className="col-md-3 mb-1">
                    <div className="card scale-card">
                        <NumberCard title={'Timeliness'} numbar={data?.category_breakdown?.timeliness || 0} numberColor="#f39c12" />
                    </div>
                </div>
            </div>

            {/* Row 3 */}
            <div className="row">
                <div className="col-md-6 mb-2">
                    <div className="card scale-card" style={{ height: "300px" }}>
                        <TopScorers />
                    </div>
                </div>
                <div className="col-md-6 mb-2">
                    <div className="card scale-card" style={{ height: "300px" }}>
                        <CombinedCircularGraph productivity={data?.category_breakdown?.productivity || 0} quality={data?.category_breakdown?.quality || 0} timeliness={data?.category_breakdown?.timeliness || 0} />
                    </div>
                </div>
            </div>
            <br /><br /><br />
        </div>
    );
};

export default ChildDashboard;
