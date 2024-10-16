"use client";
import { getSingleWidthrawRequestRequest, updateWidthrawRequestStatusRequest } from '@/http/widthraw';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = ({params}) => {
    const {id} = params;
    const [widthrawRequest,setWidthrawRequest] = useState(null);

    useEffect(() => {
        const fetchWidthrawRequest = async () => {
            const res = await getSingleWidthrawRequestRequest(id);
            setWidthrawRequest(res.data.withdrawRequest);
        };
        fetchWidthrawRequest();
    },[id]);


    const handleUpdateWidthrawRequestStatus = useCallback(async (id,status) => {
        try {
            const res = await updateWidthrawRequestStatusRequest(id,status);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    },[]);
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
      <div className="bg-white dark:bg-gray-7 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Withdraw Request Details</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">User Information</h2>
            <p><strong>Name:</strong> {widthrawRequest?.user?.name} </p>
            <p><strong>Email:</strong> {widthrawRequest?.user?.email}</p>
            <p><strong>User ID:</strong> {widthrawRequest?.user?._id}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Request Details</h2>
            <p><strong>Request ID:</strong> {widthrawRequest?._id}</p>
            <p><strong>Amount:</strong> ₹{widthrawRequest?.amount}</p>
            <p><strong>Coins:</strong> ${widthrawRequest?.coins}</p>
            <p><strong>Status:</strong> {widthrawRequest?.status}</p>
            <p><strong>Payment Method:</strong> {widthrawRequest?.method == "bank" ? "Bank Transfer" : widthrawRequest?.method}</p>
            <p><strong>Date Requested:</strong> {new Date(widthrawRequest?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Bank Details</h2>
          <p><strong>Bank Name:</strong> {widthrawRequest?.bankAccount?.bankName}</p>
          <p><strong>Account Number:</strong> {widthrawRequest?.bankAccount?.accountNumber}</p>
          <p><strong>IFSC Code:</strong> {widthrawRequest?.bankAccount?.ifscCode}</p>
          <p><strong>Account Holder Name:</strong> {widthrawRequest?.bankAccount?.accountHolderName}</p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleUpdateWidthrawRequestStatus(widthrawRequest?._id,"rejected")} disabled={widthrawRequest?.status == "rejected" || widthrawRequest?.status == "completed"}>
            Reject
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded" onClick={() => handleUpdateWidthrawRequestStatus(widthrawRequest?._id,"processing")} disabled={widthrawRequest?.status == "processing"}>
            Mark as Pending
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleUpdateWidthrawRequestStatus(widthrawRequest?._id,"completed")} disabled={widthrawRequest?.status == "completed"}>
            Complete
          </button>
        </div>
      </div>
    </div>
  )
}

export default page