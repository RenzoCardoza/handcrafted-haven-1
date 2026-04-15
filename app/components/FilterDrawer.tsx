"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/app/components/sheet";

import { Button } from "@/app/components/button";
import FilterBar from "./FilterBar"

export default function FilterDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[260px] bg-white opacity-100 backdrop-blur-none shadow-xl"
        >
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-4 px-3 pb-4">
          <FilterBar />
        </div>
      </SheetContent>
    </Sheet>
  );
}