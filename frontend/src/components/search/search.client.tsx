"use client";
import { useState } from "react";
import SearchInput from "./input";
import SearchDrawer from "./drawer";

export default function Search() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col items-center justify-center relative">
      <SearchInput search={search} setSearch={setSearch} />

      {search !== "" && <SearchDrawer search={search} />}
    </div>
  );
}
