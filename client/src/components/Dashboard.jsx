import React, { useEffect, useState } from 'react';
import axios from '../utils/axios'; 
import './Dashboard.css'; 

const Dashboard = () => {
    const [users, setUsers] = useState([]);

    // Fetch all users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/auth/users', {  // Updated to get all users
                    headers: { 'x-auth-token': token }
                });
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = "/"; 
    };

    if (!users || users.length === 0) return <h2>Loading...</h2>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Welcome</h2>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="table-responsive">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{new Date(user.dob).toLocaleDateString()}</td>
                                <td>{user.email}</td>
                                <td>••••••••••</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
