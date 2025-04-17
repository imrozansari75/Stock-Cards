import React from 'react';
import { TrendingUp } from 'lucide-react';

function DashboardHeader() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-4 bg-card border-b">
      <div className="flex items-center mb-2">
        <TrendingUp className="h-6 w-6 mr-2 text-primary" />
        <h1 className="text-2xl font-bold">Stock Card</h1>
      </div>
    </div>
  );
}

export default DashboardHeader;
