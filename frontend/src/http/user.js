"use client";
import { BACKEND_URL } from "@/constants/URLS";
import axios from "axios";


// Create an Axios instance
export const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


// User requests (examples)
export const loadUserRequest = async () => api.get("/me");
export const loginUserRequest = async (formData) =>  api.post("/login", formData);
export const registerUserRequest = async (formData) =>  api.post("/register", formData)
export const verifyUserRequest = async (formData) =>  api.post("/verify-otp", formData)
export const logoutUserRequest = async () =>  api.get("/logout")
export const getUserBalanceRequest = async () =>  api.get("/balance")




//payments requests
export const getRazorpayKeyRequest = async () => api.get("/razarpay/api-key/get");
export const checkoutRequest = async (formData) => api.post("/razarpay/checkout",formData);
export const verifyPaymentRequest = async (formData) => api.post("/razarpay/paymentverification",formData);


//bank account requests
export const addBankAccountRequest = async (formData) => api.post("/bank/create",formData);  
export const getBankAccountRequest = async () => api.get("/bank/account");


//users requests
export const getAllUsersRequest = async () => api.get("/users");
export const updateUserRoleRequest = async (id,role) => api.put(`/user/${id}/role`,{role});
