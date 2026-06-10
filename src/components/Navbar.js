import React from 'react';

import { Link } from 'react-router-dom';

function Navbar() {

    return (

        <div className="bg-blue-700 text-white p-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold">

                EOD Management System

            </h1>



            <div className="flex gap-4">

                <Link to="/">

                    <button className="bg-white text-blue-700 px-4 py-2 rounded">

                        EOD Form

                    </button>

                </Link>



                <Link to="/admin">

                    <button className="bg-black text-white px-4 py-2 rounded">

                        Admin

                    </button>

                </Link>

            </div>

        </div>

    );

}

export default Navbar;