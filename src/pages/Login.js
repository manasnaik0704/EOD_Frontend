import React from 'react';

function Login() {

    return (

        <div className="bg-white p-8 rounded shadow-md w-96 mx-auto mt-10">

            <h2 className="text-3xl font-bold mb-6 text-center">
                Employee Login
            </h2>

            <input
                type="email"
                placeholder="Enter Email"
                className="w-full border p-3 mb-4 rounded"
            />

            <input
                type="password"
                placeholder="Enter Password"
                className="w-full border p-3 mb-4 rounded"
            />

            <button
                className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800"
            >
                Login
            </button>

        </div>

    );

}

export default Login;