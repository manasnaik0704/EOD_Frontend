import React, { useEffect, useState } from 'react';

import axios from 'axios';

function ReportsPage() {

    const [reports, setReports] = useState([]);

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const response = await axios.get(
                'https://eod-system.onrender.com/api/eod'
            );

            setReports(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">

                All EOD Reports

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
                            Work Plan
                        </th>

                        <th className="border p-3">
                            Client
                        </th>

                        <th className="border p-3">
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {reports.map((report, index) => (

                        <tr key={index}>

                            <td className="border p-2">
                                {report.employee_code}
                            </td>

                            <td className="border p-2">
                                {report.name}
                            </td>

                            <td className="border p-2">
                                {report.department}
                            </td>

                            <td className="border p-2">
                                {report.report_date}
                            </td>

                            <td className="border p-2">
                                {report.work_plan}
                            </td>

                            <td className="border p-2">
                                {report.client}
                            </td>

                            <td className="border p-2">
                                {report.status}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ReportsPage;