import React, { useEffect, useState } from 'react';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import axios from 'axios';

import Navbar from './components/Navbar';

import EODForm from './pages/EODForm';

import AdminPage from './pages/AdminPage';

import AdminLogin from './pages/AdminLogin';

import ReportsPage from './pages/ReportsPage';

import ReportDetail from './pages/ReportDetail';

function App() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {

        fetchEmployees();

    }, []);

    const fetchEmployees = async () => {

        try {

            const response = await axios.get(
                'https://eod-system.onrender.com/api/employees'
            );

            setEmployees(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* EOD FORM */}

                <Route
                    path="/"
                    element={
                        <EODForm
                            employees={employees}
                        />
                    }
                />

                {/* ADMIN LOGIN */}

                <Route
                    path="/admin"
                    element={
                        <AdminLogin />
                    }
                />

                {/* ADMIN PANEL */}

                <Route
                    path="/admin-panel"
                    element={
                        <AdminPage
                            fetchEmployees={fetchEmployees}
                        />
                    }
                />

                {/* REPORTS DASHBOARD */}

                <Route
                    path="/admin-reports"
                    element={
                        <ReportsPage />
                    }
                />

                {/* SINGLE REPORT DETAIL */}

                <Route
                    path="/report/:id"
                    element={
                        <ReportDetail />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;