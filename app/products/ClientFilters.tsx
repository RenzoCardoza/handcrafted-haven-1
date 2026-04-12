"use client";

import { useState } from "react";
import FilterBar from "../components/FilterBar";

export default function ClientFilters() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 border rounded-lg bg-white shadow-sm"
        >
          Filters
        </button>
      </div>

      {/* drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex bg-black/30">
          
          <div className="bg-white w-64 h-full p-4 shadow-lg">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Filters</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <FilterBar />
          </div>

          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}