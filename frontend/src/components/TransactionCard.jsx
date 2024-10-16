import Link from "next/link"

const statusColors = {
  processing: 'bg-yellow-500',
  rejected: 'bg-red-500',
  completed: 'bg-green-500',
}

export default function TransactionCard({ transaction }) {
  
  return (
   
    <Link href={`/transactions/${transaction._id}`} className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Amount: ₹{transaction.amount}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColors[transaction.status]}`}>
          {transaction.status}
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex justify-start items-center">
          <div>
            <p className="text-gray-500">Transaction ID:</p>
            <p className="font-medium text-sm">{transaction._id}</p>
          </div>
          
        </div>
        <div className="flex justify-between items-center">

          <div>
            <p className="text-gray-500">Coins:</p>
            <p className="font-medium">${transaction.coins}</p>
          </div>
          <div>
            <p className="text-gray-500">Created At:</p>
            <p className="font-medium">{new Date(transaction.createdAt).toLocaleString()}</p>
          </div>
        </div>


        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Method:</p>
            <p className="font-medium capitalize">{transaction.method}</p>
          </div>
          
        </div>
      </div>
    </Link>
  )
}