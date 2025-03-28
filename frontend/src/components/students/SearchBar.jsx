import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({data}) => {
  const navigate = useNavigate();
  const[input, setInput] = useState(data ? data : '')

  const onSearchHandler = (e) => {
    e.preventDefault()
    navigate('/course-list/' + input)

  }

  return (
    <div className="w-full max-w-xl mx-auto flex bg-white rounded-full shadow-md overflow-hidden">
      <form  onSubmit = {onSearchHandler} className="flex w-full items-center">
        <img
          src={assets.search_icon}
          alt="search icon"
          className="w-6 h-6 md:w-8 md:h-8 px-4"
        />
        <input
        onChange={e => setInput(e.target.value)}
        value={input}
          type="text"
          placeholder="Search for courses..."
          className="flex-1 px-4 py-3 text-gray-700 focus:outline-none rounded-l-full"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 font-semibold rounded-r-full hover:bg-blue-800 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
