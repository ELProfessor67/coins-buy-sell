"use client";
import { getAllWithdrawRequestsRequest } from '@/http/widthraw';
import { Download, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function page() {
  const [activeTab,setActiveTab] = useState('pending');
  const [widthrawRequests,setWidthrawRequests] = useState([]);
  const router = useRouter();

 const widthrawRequestsData = useMemo(()=>{
  return widthrawRequests.filter(widthrawRequest => widthrawRequest.status == (activeTab == 'pending' ? 'processing' : activeTab == 'paids' ? 'completed' : 'rejected'));
 },[widthrawRequests,activeTab]);


  //get widthraw requests
  useEffect(() => {
    const fetchWidthrawRequests = async () => {
      const res = await getAllWithdrawRequestsRequest();
      console.log(res.data.withdrawRequests,'widthrawRequests');
      setWidthrawRequests(res.data.withdrawRequests);
    };
    fetchWidthrawRequests();
  }, []);

  const handleViewWidthrawRequest = useCallback((id) => {
    router.push(`/dashboard/widthraw-request/${id}`);
  },[router]);

  return (

    <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6">

      <div className="dark:bg-gray-7 bg-white rounded-md p-3 my-4">
        <h1 className="text-2xl font-bold mb-4">Widthraw Requests</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Widthraw Requests Summary</p>

        {/* Bill Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: "Pending Requests", value: widthrawRequests?.filter(r => r.status == 'processing')?.length, change: "+10% from yesterday" },
            { title: "Paids Requests", value: widthrawRequests?.filter(r => r.status == 'completed')?.length, change: "+8% from yesterday" },
            { title: "Rejected Requests", value: widthrawRequests?.filter(r => r.status == 'rejected')?.length, change: "+2% from yesterday" },
            { title: "Total Requests", value: widthrawRequests?.length, change: "+3% from yesterday" },
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
            <h2 onClick={() => setActiveTab('pending')} className={`cursor-pointer text-[20px] font-semibold border-b-[3px] pb-2 ${activeTab == 'pending' ? 'border-black dark:border-white' : 'border-transparent dark:border-transparent'}`}>Pending</h2>
            <h2 onClick={() => setActiveTab('paids')} className={`cursor-pointer text-[20px] font-semibold border-b-[3px] pb-2 ${activeTab == 'paids' ? 'border-black dark:border-white' : 'border-transparent dark:border-transparent'}`}>Paids</h2>
            <h2 onClick={() => setActiveTab('rejected')} className={`cursor-pointer text-[20px] font-semibold border-b-[3px] pb-2 ${activeTab == 'rejected' ? 'border-black dark:border-white' : 'border-transparent dark:border-transparent'}`}>Rejected</h2>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="pb-4">Transaction ID</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Date Created</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Coins</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {widthrawRequestsData && widthrawRequestsData.map((widthrawRequest, index) => (
              <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-4">{widthrawRequest._id}</td>
                <td className="py-4">
                  <span className={`inline-flex items-center ${widthrawRequest.status == 'rejected' % 3 === 1 ? 'text-red-600 dark:text-red-400' : widthrawRequest.status == 'completed' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${widthrawRequest.status == 'rejected' ? 'bg-red-600 dark:bg-red-400' : widthrawRequest.status == 'completed' ? 'bg-green-600 dark:bg-green-400' : 'bg-yellow-600 dark:bg-yellow-400'}`}></span>
                    {widthrawRequest.status}
                  </span>
                </td>
                <td className="py-4">{new Date(widthrawRequest.createdAt).toLocaleDateString()}</td>
                <td className="py-4">₹{widthrawRequest.amount}</td>
                <td className="py-4">${widthrawRequest.coins}</td>
                <td className="py-4">
                  <button className=" dark:bg-white dark:text-black bg-black text-white hover:text-gray-900 rounded-md px-4 py-2 font-medium" onClick={() => handleViewWidthrawRequest(widthrawRequest._id)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>


  )
}