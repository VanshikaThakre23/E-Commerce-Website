import React from 'react'
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
    return (
        <div className="w-full h-11 bg-gray-200 rounded-2xl flex items-center px-3">

            <input
                type="text"
                placeholder="Search here..."
                className="w-full bg-transparent text-sm outline-none placeholder-gray-500 px-2"
            />

            <Button
                sx={{
                    minWidth: "40px",
                    color: "#3333",
                    borderRadius: "35%",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        backgroundColor: "#3333",
                        transform: "scale(1.05) ",
                        color: "#000",
                    },
                }}
            >
                <IoSearch size={20} />
            </Button>

        </div>
    )
}

export default SearchBar