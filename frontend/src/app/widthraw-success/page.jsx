import { CheckCircle, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page({searchParams}) {
  const transactionId = searchParams.transactionId;
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
        <div className="text-center p-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-600">Withdrawal Request Successful</h2>
        </div>
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-4">
            Your withdrawal request has been successfully processed. You can expect to receive your payment within the next 3-4 working days.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Estimated arrival: 3-4 working days</span>
          </div>
        </div>
        <div className="p-6 flex justify-center space-x-4">
          <Link href="/profile" className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Link>
          <Link href={`/transactions/${transactionId}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Transaction Details
          </Link>
        </div>
      </div>
    </div>
  );
}
