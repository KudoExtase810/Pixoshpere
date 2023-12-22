import React from "react";

const Icons = {
    CartPlus: ({ size = 24 }: { size?: number }) => (
        <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox={`0 0 ${size} ${size}`}
            stroke-linecap="round"
            stroke-linejoin="round"
            height="200px"
            width="200px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M12.5 17h-6.5v-14h-2"></path>
            <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5"></path>
            <path d="M16 19h6"></path>
            <path d="M19 16v6"></path>
        </svg>
    ),
    CartMinus: ({ size = 24 }: { size?: number }) => (
        <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox={`0 0 ${size} ${size}`}
            stroke-linecap="round"
            stroke-linejoin="round"
            height="200px"
            width="200px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M13 17h-7v-14h-2"></path>
            <path d="M6 5l14 1l-1 7h-13"></path>
            <path d="M22 22l-5 -5"></path>
            <path d="M17 22l5 -5"></path>
        </svg>
    ),
};

export default Icons;
