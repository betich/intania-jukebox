"use client";
import { useState } from "react";
import SearchInput from "./input";
import SearchDrawer from "./drawer";
import { useDebounce } from "@uidotdev/usehooks";

export default function Search() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <SearchInput search={search} setSearch={setSearch} />

      {search !== "" && <SearchDrawer search={debouncedSearch} />}
    </div>
  );
}
