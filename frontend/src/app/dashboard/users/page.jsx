"use client";
import { getAllUsersRequest, updateUserRoleRequest } from '@/http/user';
import { getAllWithdrawRequestsRequest } from '@/http/widthraw';
import { Download, Eye } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';

export default function page() {
  const [activeTab,setActiveTab] = useState('total');
  const [users,setUsers] = useState([]);

  const usersData = useMemo(()=>{
    if(activeTab == 'total') return users;
    return users.filter(user => user.role == activeTab);
  },[users,activeTab]);



  //get widthraw requests
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsersRequest();
      console.log(res.data.users,'users');
      setUsers(res.data.users);
    };
    fetchUsers();
  }, []);


  const updateUserRole = async (id,role) => {
    try{
      const res = await updateUserRoleRequest(id,role);
      toast.success(res.data.message);
      setUsers(users.map(user => user._id == id ? {...user,role:role} : user));
    }catch(err){
      toast.error(err?.response?.data?.message || err.message);
      
    }
  }

  return (

    <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6">

      <div className="dark:bg-gray-7 bg-white rounded-md p-3 my-4">
        <h1 className="text-2xl font-bold mb-4">Users Summary</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Users Summary</p>

        {/* Bill Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {[
            { title: "Admins", value: users?.filter(u => u.role == "admin")?.length, change: "User with an Admin role." },
            { title: "Users", value: users?.filter(u => u.role == "user")?.length, change: "User with an User role." },
            { title: "Total", value: users?.length, change: "Total Users" },
          ].map((stat, index) => (
            <div key={index} className="bg-white-shade-1 dark:bg-gray-8 p-6 rounded-lg shadow">
              <h2 className="text-4xl font-bold mb-2">{stat.value}</h2>
              <p className="text-black dark:text-white-shade-1 mb-1 text-[18px] font-medium">{stat.title}</p>
              <p className="text-sm text-black dark:text-white text-[12px] font-medium">{stat.change}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Summary Table */}
      <div className="dark:bg-gray-7 bg-white  rounded-lg shadow p-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="mb-4 flex flex-row gap-10">
            <h2 onClick={() => setActiveTab('total')} className={`cursor-pointer text-[20px] font-semibold border-b-[3px] pb-2 ${activeTab == 'total' ? 'border-black dark:border-white' : 'border-transparent dark:border-transparent'}`}>Total</h2>
            <h2 onClick={() => setActiveTab('admin')} className={`cursor-pointer text-[20px] font-semibold border-b-[3px] pb-2 ${activeTab == 'admin' ? 'border-black dark:border-white' : 'border-transparent dark:border-transparent'}`}>Admins</h2>
            <h2 onClick={() => setActiveTab('user')} className={`cursor-pointer text-[20px] font-semibold border-b-[3px] pb-2 ${activeTab == 'user' ? 'border-black dark:border-white' : 'border-transparent dark:border-transparent'}`}>Users</h2>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="pb-4">Email</th>
              <th className="pb-4">Name</th>
              <th className="pb-4">Joining Date</th>
              <th className="pb-4">role</th>
              <th className="pb-4">phone</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData && usersData.map((user, index) => (
              <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-4">{user.email}</td>
                <td className="py-4">
                  {user.name}
                </td>
                <td className="py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-4">{user.role}</td>
                <td className="py-4">{user.phone}</td>
                <td className="py-4">
                  <select className="bg-white dark:bg-gray-8 rounded-md p-2" value={user.role} onChange={(e) => updateUserRole(user._id,e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>


  )
}