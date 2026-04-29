// components/user/UserTable.jsx


type TableUser = {
  id: string;
  name: string;
  email: string;
  user_name: string;
  createdAt: string;
  is_blocked: boolean;
};

export default function UserTable({users , changeStatus} : {users : TableUser[] , changeStatus : (id : string , status : boolean)=> void}) {


    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
                    <tr>
                        <th className="p-3 text-left">NO</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Username</th>
                        <th className="p-3 text-left">Joined Date</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(users) &&  users?.map((user , index) => (
                        <tr key={user.id} className="border-t hover:bg-gray-50">

                            <td className="p-3">{index + 1}</td>

                            {/* USER */}

                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3 text-green-600">{user.user_name}</td>
                            <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                            {/* <td className="p-3">{user.gender}</td> */}

                            {/* STATUS */}
                            <td className="p-3">
                                <span
                                    onClick={()=> changeStatus(user.id , user.is_blocked)}
                                    className={`px-2 py-1 text-xs cursor-pointer rounded ${!user.is_blocked
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-500"
                                        }`}
                                >
                                    {user.is_blocked ? "Blocked" : "Active"}
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

        </div>
    );
}