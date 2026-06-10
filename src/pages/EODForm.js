import React, { useState } from 'react';

function EODForm({ employees }) {

    const currentDate = new Date().toLocaleDateString('en-GB');



    /*
    ===============================================================
    STATES
    ===============================================================
    */

    const [employee, setEmployee] = useState('');

    const [employeeCode, setEmployeeCode] = useState('');

    const [department, setDepartment] = useState('');



    const [tasks, setTasks] = useState([
        {
            work_plan: '',
            client: '',
            status: 'Done'
        }
    ]);



    /*
    ===============================================================
    EMPLOYEE CHANGE
    ===============================================================
    */

    const handleEmployeeChange = (e) => {

        const selectedEmployee = employees.find(
            emp => emp.id === Number(e.target.value)
        );

        setEmployee(e.target.value);

        setDepartment(
            selectedEmployee?.department || ''
        );

        setEmployeeCode(
            selectedEmployee?.employee_code || ''
        );

    };



    /*
    ===============================================================
    TASK CHANGE
    ===============================================================
    */

    const handleTaskChange = (
        index,
        field,
        value
    ) => {

        const updatedTasks = [...tasks];

        updatedTasks[index][field] = value;

        setTasks(updatedTasks);

    };



    /*
    ===============================================================
    ADD ROW
    ===============================================================
    */

    const addRow = () => {

        setTasks([
            ...tasks,
            {
                work_plan: '',
                client: '',
                status: 'Done'
            }
        ]);

    };



    /*
    ===============================================================
    REMOVE ROW
    ===============================================================
    */

    const removeRow = (index) => {

        const updatedTasks = tasks.filter(
            (_, i) => i !== index
        );

        setTasks(updatedTasks);

    };



    /*
    ===============================================================
    SUBMIT EOD
    ===============================================================
    */

    const handleSubmit = async () => {

        try {

            const payload = {

                employee_id: employee,

                department: department,

                report_date: new Date()
                    .toISOString()
                    .split('T')[0],

                tasks: tasks

            };



            const response = await fetch(
                'https://eod-system.onrender.com/api/eod',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            alert(data.message);



            /*
            =========================================================
            RESET FORM
            =========================================================
            */

            setTasks([
                {
                    work_plan: '',
                    client: '',
                    status: 'Done'
                }
            ]);



        } catch (error) {

            console.log(error);

            alert('Submission Failed');

        }

    };



    /*
    ===============================================================
    UI
    ===============================================================
    */

    return (

        <div className="bg-white p-6 rounded shadow w-11/12 mx-auto mt-10">

            <h2 className="text-3xl font-bold text-center mb-10 underline">

                EOD REPORT

            </h2>



            {/* =========================================================
                TOP SECTION
            ========================================================= */}

            <div className="grid grid-cols-4 gap-6 mb-10">

                {/* =====================================
                    EMPLOYEE NAME
                ===================================== */}

                <div>

                    <label className="font-bold">

                        Employee Name

                    </label>

                    <select
                        onChange={handleEmployeeChange}
                        className="w-full border p-3 rounded mt-2"
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {
                            employees.map((emp) => (

                                <option
                                    key={emp.id}
                                    value={emp.id}
                                >

                                    {emp.employee_code}
                                    {' - '}
                                    {emp.name}

                                </option>

                            ))
                        }

                    </select>

                </div>



                {/* =====================================
                    EMPLOYEE ID
                ===================================== */}

                <div>

                    <label className="font-bold">

                        Employee ID

                    </label>

                    <input
                        type="text"
                        value={employeeCode}
                        readOnly
                        className="w-full border p-3 rounded mt-2 bg-gray-100"
                    />

                </div>



                {/* =====================================
                    DEPARTMENT
                ===================================== */}

                <div>

                    <label className="font-bold">

                        Department

                    </label>

                    <input
                        type="text"
                        value={department}
                        readOnly
                        className="w-full border p-3 rounded mt-2 bg-gray-100"
                    />

                </div>



                {/* =====================================
                    DATE
                ===================================== */}

                <div>

                    <label className="font-bold">

                        Date

                    </label>

                    <input
                        type="text"
                        value={currentDate}
                        readOnly
                        className="w-full border p-3 rounded mt-2 bg-gray-100"
                    />

                </div>

            </div>



            {/* =========================================================
                TABLE
            ========================================================= */}

            <table className="w-full border">

                <thead className="bg-blue-700 text-white">

                    <tr>

                        <th className="p-3 border">
                            Sr No.
                        </th>

                        <th className="p-3 border">
                            Work Plan
                        </th>

                        <th className="p-3 border">
                            Client / Required For
                        </th>

                        <th className="p-3 border">
                            Remarks / Status
                        </th>

                        <th className="p-3 border">
                            Action
                        </th>

                    </tr>

                </thead>



                <tbody>

                    {
                        tasks.map((task, index) => (

                            <tr key={index}>

                                <td className="border p-3 text-center">

                                    {index + 1}

                                </td>



                                {/* ===============================
                                    WORK PLAN
                                =============================== */}

                                <td className="border p-3">

                                    <input
                                        type="text"
                                        value={task.work_plan}
                                        onChange={(e) =>
                                            handleTaskChange(
                                                index,
                                                'work_plan',
                                                e.target.value
                                            )
                                        }
                                        className="w-full border p-2 rounded"
                                    />

                                </td>



                                {/* ===============================
                                    CLIENT
                                =============================== */}

                                <td className="border p-3">

                                    <input
                                        type="text"
                                        value={task.client}
                                        onChange={(e) =>
                                            handleTaskChange(
                                                index,
                                                'client',
                                                e.target.value
                                            )
                                        }
                                        className="w-full border p-2 rounded"
                                    />

                                </td>



                                {/* ===============================
                                    STATUS
                                =============================== */}

                                <td className="border p-3">

                                    <select
                                        value={task.status}
                                        onChange={(e) =>
                                            handleTaskChange(
                                                index,
                                                'status',
                                                e.target.value
                                            )
                                        }
                                        className="w-full border p-2 rounded"
                                    >

                                        <option>
                                            Done
                                        </option>

                                        <option>
                                            Pending
                                        </option>

                                        <option>
                                            In Progress
                                        </option>

                                    </select>

                                </td>



                                {/* ===============================
                                    DELETE BUTTON
                                =============================== */}

                                <td className="border p-3 text-center">

                                    <button
                                        onClick={() =>
                                            removeRow(index)
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>



            {/* =========================================================
                BUTTONS
            ========================================================= */}

            <div className="flex justify-between mt-6">

                <button
                    onClick={addRow}
                    className="bg-blue-700 text-white px-6 py-3 rounded"
                >

                    + Add Row

                </button>



                <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-6 py-3 rounded"
                >

                    Submit EOD

                </button>

            </div>

        </div>

    );

}

export default EODForm;