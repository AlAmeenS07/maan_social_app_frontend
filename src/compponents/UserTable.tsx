// components/user/UserTable.jsx

import { useState } from "react";
import Pagination from "./pagination";

export default function UserTable({users} : {users : any[]}) {


    const [currentPage , setCurrentPage] = useState(1)

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
                    <tr>
                        <th className="p-3 text-left">User</th>
                        <th className="p-3 text-left">Username</th>
                        <th className="p-3 text-left">DOB</th>
                        <th className="p-3 text-left">Joined Date</th>
                        <th className="p-3 text-left">Gender</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr className="border-t hover:bg-gray-50">

                            {/* USER */}
                            <td className="p-3 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full" />

                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </td>

                            <td className="p-3 text-green-600">{user.username}</td>
                            <td className="p-3">{user.dob}</td>
                            <td className="p-3">{user.createdAt}</td>
                            <td className="p-3">{user.gender}</td>

                            {/* STATUS */}
                            <td className="p-3">
                                <span
                                    className={`px-2 py-1 text-xs cursor-pointer rounded ${user.status === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-500"
                                        }`}
                                >
                                    {user.status}
                                </span>
                            </td>

                            {/* ACTIONS */}
                            <td className="p-3 flex items-center gap-2">
                                <button className="text-sm border px-2 py-1 rounded">
                                    View Details
                                </button>

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* FOOTER */}
            {/* <div className="flex justify-between items-center p-4 text-sm text-gray-500">
                <span>Showing 1–6 of 128,430 users</span>

                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={10}/>
            </div> */}

        </div>
    );
}