import React from "react";

function Header({ user }: { user: { fullName: string; description: string; image: string } }) {
  const { fullName, description, image } = user;
  return (
    <div className="relative flex items-center space-x-4">
      <div className="relative">
        <span className="absolute text-green-500 right-0 bottom-0">
          <svg width="20" height="20">
            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
          </svg>
        </span>
        <img src={image} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
      </div>
      <div className="flex flex-col leading-tight">
        <div className="text-2xl mt-1 flex items-center">
          <span className="text-gray-700 mr-3">{fullName}</span>
        </div>
        <span className="text-lg text-gray-600">{description}</span>
      </div>
    </div>
  );
}

export default Header;
