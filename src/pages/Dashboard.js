import React from 'react';

function Dashboard({ reports }) {

    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                EOD Dashboard
            </h1>

            <div className="overflow-auto bg-white rounded shadow">

                <table className="w-full">

                    <thead className="bg-blue-700 text-white">

                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Employee</th>
                            <th className="p-3">Work Done</th>
                            <th className="p-3">Pending Work</th>
                            <th className="p-3">Tomorrow Plan</th>
                            <th className="p-3">Remarks</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            reports.map((report) => (

                                <tr
                                    key={report.id}
                                    className="border-b"
                                >

                                    <td className="p-3">{report.id}</td>

                                    <td className="p-3">{report.name}</td>

                                    <td className="p-3">{report.work_done}</td>

                                    <td className="p-3">{report.pending_work}</td>

                                    <td className="p-3">{report.tomorrow_plan}</td>

                                    <td className="p-3">{report.remarks}</td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Dashboard;