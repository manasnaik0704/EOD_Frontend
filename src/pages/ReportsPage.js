import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReportsPage() {

    const navigate = useNavigate();

    const [reports, setReports] = useState([]);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {

        try {

            const response = await axios.get(
                'https://eod-system.onrender.com/api/eod-summary'
            );

            setReports(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteReport = async (reportId) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this EOD Report?'
        );

        if (!confirmDelete) return;

        try {

            const response = await axios.delete(
                `https://eod-system.onrender.com/api/eod/${reportId}`
            );

            alert(response.data.message);

            loadReports();

        } catch (error) {

            console.log(error);

            alert('Delete Failed');

        }

    };

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">

                EOD Reports Dashboard

            </h1>

            <table className="w-full border">

                <thead className="bg-blue-700 text-white">

                    <tr>

                        <th className="border p-3">
                            Employee ID
                        </th>

                        <th className="border p-3">
                            Employee Name
                        </th>

                        <th className="border p-3">
                            Department
                        </th>

                        <th className="border p-3">
                            Date
                        </th>

                        <th className="border p-3">
                            Tasks
                        </th>

                        <th className="border p-3">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {reports.map((report) => (

                        <tr key={report.report_id}>

                            <td className="border p-3">
                                {report.employee_code}
                            </td>

                            <td className="border p-3">
                                {report.name}
                            </td>

                            <td className="border p-3">
                                {report.department}
                            </td>

                            <td className="border p-3">
                                {new Date(
                                    report.report_date
                                ).toLocaleDateString()}
                            </td>

                            <td className="border p-3">
                                {report.task_count}
                            </td>

                            <td className="border p-3">

                                <div className="flex gap-2">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/report/${report.report_id}`
                                            )
                                        }
                                        className="bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteReport(
                                                report.report_id
                                            )
                                        }
                                        className="bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ReportsPage;