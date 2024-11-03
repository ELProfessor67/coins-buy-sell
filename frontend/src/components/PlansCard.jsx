export default function CoinCard({ coins, price, extra, isPopular, isHovered,checkoutHandler, loading,index }) {
    return (
      <div 
      
        className={`
          relative overflow-hidden rounded-3xl 
          bg-white
          shadow-lg transition-all duration-300 transform cursor-pointer
          ${isHovered ? 'scale-105 shadow-2xl' : ''}
        `}
      >
        {isPopular && (
          <div className="absolute top-5 right-5 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
            BEST VALUE
          </div>
        )}
        <div className="p-8">
          <div className={`text-5xl font-extrabold mb-2 text-purple-600 `}>
            ${coins}
          </div>
          <div className={`text-xl mb-6 text-purple-600`}>Coins</div>
          <div className={`text-4xl font-bold mb-4 text-purple-600 `}>
          ₹{price.toFixed(2)}
          </div>
          <div className={`text-sm mb-8 text-purple-600`}>
            + {extra.toLocaleString()} Extra Coins
          </div>
          <button
            onClick={() => checkoutHandler(price,coins+extra,index)}
            className={`
              w-full py-4 px-6 rounded-full text-lg font-semibold transition-all duration-300
             bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg cursor-pointer
            `}
          >
            {loading == index ? "Loading..." : "Buy Now"}
          </button>
        </div>
        <div 
          className={`
            absolute inset-0 border-4 rounded-3xl transition-opacity duration-300 pointer-events-none
            ${isPopular ? 'border-yellow-400' : 'border-purple-300'}
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        ></div>
      </div>
    )
  }