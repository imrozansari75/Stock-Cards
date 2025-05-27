// import React from 'react';
// import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';

// const StockCard = ({ stock }) => {
//   const isPositive = stock.change >= 0;
  
//   // Formatting functions
//   const formatMarketCap = (billions) => {
//     return billions >= 1000 ? `$${(billions/1000).toFixed(1)}T` : `$${billions}B`;
//   };

//   const formatVolume = (millions) => {
//     return millions >= 1000 ? `${(millions/1000).toFixed(1)}B` : `${millions}M`;
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
//       {/* Header */}
//       <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-100">
//         <div className="truncate pr-2">
//           <h3 className="font-bold text-lg truncate">{stock.ticker}</h3>
//           <p className="text-sm text-gray-500 truncate">{stock.name}</p>
//         </div>
//         <span className={`px-2 py-1 text-xs font-medium rounded-md 
//           ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//           {stock.sector}
//         </span>
//       </div>

//       {/* Body */}
//       <div className="p-4 flex-grow">
//         {/* Price row */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center">
//             <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
//             <span className="text-2xl font-bold">${stock.price.toFixed(2)}</span>
//           </div>
//           <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
//             {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
//             <span className="ml-1 text-sm font-medium">
//               {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
//             </span>
//           </div>
//         </div>

//         {/* Stats grid */}
//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wider">Market Cap</p>
//             <p className="font-medium">{formatMarketCap(stock.marketCap)}</p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wider">Volume</p>
//             <p className="font-medium">{formatVolume(stock.volume)}</p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wider">P/E Ratio</p>
//             <p className="font-medium">{stock.peRatio.toFixed(2)}</p>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wider">Dividend</p>
//             <p className="font-medium">
//               {stock.dividend > 0 ? `${stock.dividend.toFixed(2)}%` : 'None'}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockCard;




import React from 'react';
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';

const StockCard = ({ stock }) => {
  // Safety check in case stock is null/undefined
  if (!stock) return null;
  
  const isPositive = stock.change >= 0;
  
  // Formatting functions
  const formatMarketCap = (billions) => {
    if (billions === undefined || billions === null) return "N/A";
    return billions >= 1000 ? `$${(billions/1000).toFixed(1)}T` : `$${billions}B`;
  };

  const formatVolume = (millions) => {
    if (millions === undefined || millions === null) return "N/A";
    return millions >= 1000 ? `${(millions/1000).toFixed(1)}B` : `${millions}M`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-100">
        <div className="truncate pr-2">
          <h3 className="font-bold text-lg truncate">{stock.ticker}</h3>
          <p className="text-sm text-gray-500 truncate">{stock.name}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-md 
          ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {stock.sector}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex-grow">
        {/* Price row */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
            <span className="text-2xl font-bold">
              ${typeof stock.price === 'number' ? stock.price.toFixed(2) : 'N/A'}
            </span>
          </div>
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span className="ml-1 text-sm font-medium">
              {isPositive ? '+' : ''}
              {typeof stock.change === 'number' ? stock.change.toFixed(2) : 'N/A'} 
              ({isPositive ? '+' : ''}
              {typeof stock.changePercent === 'number' ? stock.changePercent.toFixed(2) : 'N/A'}%)
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Market Cap</p>
            <p className="font-medium">{formatMarketCap(stock.marketCap)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Volume</p>
            <p className="font-medium">{formatVolume(stock.volume)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">P/E Ratio</p>
            <p className="font-medium">
              {typeof stock.peRatio === 'number' ? stock.peRatio.toFixed(2) : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Dividend</p>
            <p className="font-medium">
              {stock.dividend > 0 ? `${stock.dividend.toFixed(2)}%` : 'None'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;