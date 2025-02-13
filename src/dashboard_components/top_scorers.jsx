import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useAuth } from '../customHooks/user_auth';

const TopScorers = () => {
    const {accessToken} = useAuth()
    const [topScorers, setTopScorers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopScorers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/app/top_scored_employees",{
                    headers:{
                        Authorization:`Bearer ${accessToken}`
                    }
                });
                if (response.data.success) {
                    setTopScorers(response.data.data);
                } else {
                    throw new Error("Failed to fetch top scorers");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopScorers();
    }, []);

    return (
        <div className="card shadow-sm" style={{ borderRadius: '10px', overflowY: "auto" }}>
            <div className="card-body">
                <h5 className="card-title">Top Scorers</h5>
                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && (
                    <div className="list-group">
                        {topScorers.map((scorer) => (
                            <div className="list-group-item d-flex justify-content-between align-items-center" key={scorer.employee_id}>
                                <div>
                                    <strong>{scorer.employee_name}</strong>
                                    <p className="mb-0 text-muted">Final Score: {scorer.final_score}</p>
                                </div>
                                <span className="badge bg-success">
                                    {scorer.final_score}%
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopScorers;
