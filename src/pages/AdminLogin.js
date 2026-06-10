import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function AdminLogin() {

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const navigate = useNavigate();



    const handleLogin = () => {

        if (
            username === 'admin'
            &&
            password === 'admin123'
        ) {

            navigate('/admin-panel');

        } else {

            alert('Invalid Login');

        }

    };



    return (

        <div className="bg-white p-8 rounded shadow w-96 mx-auto mt-20">

            <h2 className="text-3xl font-bold mb-6 text-center">

                Admin Login

            </h2>



            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
                className="w-full border p-3 mb-4 rounded"
            />



            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                className="w-full border p-3 mb-4 rounded"
            />



            <button
                onClick={handleLogin}
                className="w-full bg-blue-700 text-white p-3 rounded"
            >

                Login

            </button>

        </div>

    );

}

export default AdminLogin;