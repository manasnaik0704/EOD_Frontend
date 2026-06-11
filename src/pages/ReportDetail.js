import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReportDetail() {

    const { id } = useParams();

    const [report, setReport] = useState([]);

    useEffect(() => {

        const loadReport = async () => {

            try {

                const response = await axios.get(
                    `https://eod-system.onrender.com/api/eod/${id}`
                );

                setReport(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        loadReport();

    }, [id]);

    if (report.length === 0) {

        return (
            <div className="p-8">
                Loading...
            </div>
        );

    }

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                EOD Report Details
            </h1>

            <div className="mb-6">

                <p><b>Employee ID:</b> {report[0].employee_code}</p>
                <p><b>Name:</b> {report[0].name}</p>
                <p><b>Department:</b> {report[0].department}</p>
                <p><b>Date:</b> {report[0].report_date}</p>

            </div>

            <table className="w-full border">

                <thead className="bg-blue-700 text-white">

                    <tr>
                        <th className="border p-3">Sr No.</th>
                        <th className="border p-3">Work Plan</th>
                        <th className="border p-3">Client</th>
                        <th className="border p-3">Status</th>
                    </tr>

                </thead>

                <tbody>

                    {report.map((task, index) => (

                        <tr key={index}>

                            <td className="border p-3">
                                {index + 1}
                            </td>

                            <td className="border p-3">
                                {task.work_plan}
                            </td>

                            <td className="border p-3">
                                {task.client}
                            </td>

                            <td className="border p-3">
                                {task.status}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ReportDetail;