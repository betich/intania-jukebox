import { BiSearch } from "react-icons/bi";

export default function Search() {
  return (
    <div className="flex items-center justify-center relative">
      <BiSearch className="text-gray-400 w-6 h-6 absolute left-4" />
      <input
        type="text"
        className="w-full px-12 py-4 bg-white rounded-full border-gray-100 shadow-lg"
        placeholder="ค้นหาเพลง 🎵"
      />
    </div>
  );
}
