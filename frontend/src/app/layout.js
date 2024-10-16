import UserProvider from "@/providers/UserProvider";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script";



export const metadata = {
  title: "Cryptoland",
  description: "Cryptoland",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <UserProvider>
          {children}
        </UserProvider>


        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      <Script src="https://checkout.razorpay.com/v1/checkout.js" defer/>
      </body>
    </html>
  );
}
