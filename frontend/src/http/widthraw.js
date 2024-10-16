"use client";
import { BACKEND_URL } from "@/constants/URLS";
import axios from "axios";


// Create an Axios instance
const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


//widthraw requests
export const createWithdrawRequestRequest = async (formData) => api.post("/widthraw/create",formData);  
export const getUserWidthrawRequestRequest = async () => api.get("/widthraw/get-all-user-withdraw-requests");
export const getAllWithdrawRequestsRequest = async () => api.get("/widthraw/get-all-withdraw-requests");
export const getSingleWidthrawRequestRequest = async (id) => api.get(`/widthraw/widthraw-request/${id}`);
export const updateWidthrawRequestStatusRequest = async (id,status) => api.put(`/widthraw/update-withdraw-request-status/${id}`,{status});

