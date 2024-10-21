import React, { useEffect, useState } from 'react';
import axios from '../utils/axios'; 
import './Dashboard.css'; 

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/auth/me', {
                    headers: { 'x-auth-token': token }
                });
                setUserData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) return <h2>Loading...</h2>;

    return (
        <div className="dashboard-container">
            <h2>Welcome {userData.name}</h2>
            <div className="table-responsive">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userData.name}</td>
                            <td>{new Date(userData.dob).toLocaleDateString()}</td>
                            <td>{userData.email}</td>
                            <td>••••••••••</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
