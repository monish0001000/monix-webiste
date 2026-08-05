import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="py-12 bg-[#FAF8F5] min-h-[60vh] animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Skeleton Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="h-6 w-36 bg-amber-500/20 rounded-full mx-auto"></div>
          <div className="h-10 w-3/4 bg-slate-200 rounded-xl mx-auto"></div>
          <div className="h-4 w-1/2 bg-slate-200 rounded-lg mx-auto"></div>
        </div>

        {/* Skeleton Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/80 rounded-3xl p-6 border border-amber-500/10 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-amber-500/15 rounded-2xl"></div>
              <div className="h-6 w-3/4 bg-slate-200 rounded-md"></div>
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-slate-100 rounded-md"></div>
                <div className="h-3.5 w-5/6 bg-slate-100 rounded-md"></div>
                <div className="h-3.5 w-4/6 bg-slate-100 rounded-md"></div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="h-5 w-20 bg-amber-500/20 rounded-md"></div>
                <div className="h-8 w-24 bg-amber-500/30 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
