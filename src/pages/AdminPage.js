import React, {
    useEffect,
    useState
} from 'react';

import axios from 'axios';

function AdminPage({ fetchEmployees }) {

    const [employees, setEmployees] = useState([]);

    const [employeeCode, setEmployeeCode] = useState('');

    const [name, setName] = useState('');

    const [department, setDepartment] = useState('');



    /*
    ==========================================
    LOAD EMPLOYEES
    ==========================================
    */

    useEffect(() => {

        loadEmployees();

    }, []);



    const loadEmployees = async () => {

        try {

            const response = await axios.get(
                'http://localhost:5000/api/employees'
            );

            setEmployees(response.data);

        } catch (error) {

            console.log(error);

        }

    };



    /*
    ==========================================
    ADD EMPLOYEE
    ==========================================
    */

    const addEmployee = async () => {

        try {

            if (
                !employeeCode
                ||
                !name
                ||
                !department
            ) {

                alert(
                    'Enter Employee ID, Name & Department'
                );

                return;

            }

            const response = await axios.post(
                'http://localhost:5000/api/employees',
                {
                    employee_code: employeeCode,
                    name,
                    department
                }
            );

            alert(response.data.message);



            /*
            ======================================
            RESET INPUTS
            ======================================
            */

            setEmployeeCode('');

            setName('');

            setDepartment('');



            /*
            ======================================
            RELOAD EMPLOYEES
            ======================================
            */

            loadEmployees();

            fetchEmployees();



        } catch (error) {

            console.log(error);

            alert('Add Employee Failed');

        }

    };



    /*
    ==========================================
    DELETE EMPLOYEE
    ==========================================
    */

    const deleteEmployee = async (id) => {

        try {

            const response = await axios.delete(
                `http://localhost:5000/api/employees/${id}`
            );

            alert(response.data.message);



            /*
            ======================================
            RELOAD EMPLOYEES
            ======================================
            */

            loadEmployees();

            fetchEmployees();

        } catch (error) {

            console.log(error);

            alert('Delete Failed');

        }

    };



    /*
    ==========================================
    UI
    ==========================================
    */

    return (

        <div className="bg-white p-8 rounded shadow w-11/12 mx-auto mt-10">

            <h1 className="text-3xl font-bold mb-8">

                Admin Employee Management

            </h1>



            {/* ======================================
                INPUT SECTION
            ====================================== */}

            <div className="grid grid-cols-4 gap-4 mb-8">

                <input
                    type="text"
                    placeholder="Employee ID"
                    value={employeeCode}
                    onChange={(e) =>
                        setEmployeeCode(e.target.value)
                    }
                    className="border p-3 rounded"
                />



                <input
                    type="text"
                    placeholder="Employee Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    className="border p-3 rounded"
                />



                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) =>
                        setDepartment(e.target.value)
                    }
                    className="border p-3 rounded"
                />



                <button
                    onClick={addEmployee}
                    className="bg-blue-700 text-white rounded p-3"
                >

                    Add Employee

                </button>

            </div>



            {/* ======================================
                EMPLOYEE TABLE
            ====================================== */}

            <table className="w-full border">

                <thead className="bg-blue-700 text-white">

                    <tr>

                        <th className="p-3 border">

                            Employee ID

                        </th>

                        <th className="p-3 border">

                            Employee Name

                        </th>

                        <th className="p-3 border">

                            Department

                        </th>

                        <th className="p-3 border">

                            Action

                        </th>

                    </tr>

                </thead>



                <tbody>

                    {
                        employees.map((employee) => (

                            <tr key={employee.id}>

                                <td className="border p-3 text-center">

                                    {employee.employee_code}

                                </td>

                                <td className="border p-3">

                                    {employee.name}

                                </td>

                                <td className="border p-3">

                                    {employee.department}

                                </td>

                                <td className="border p-3 text-center">

                                    <button
                                        onClick={() =>
                                            deleteEmployee(employee.id)
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

        </div>

    );

}

export default AdminPage;