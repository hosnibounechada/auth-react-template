import React from "react";

const FriendItem = ({
  message,
  selected,
  onSelect,
}: {
  message: { id: string; fullName: string; lastMessage: string; image: string; time: string; status: boolean };
  selected: string;
  onSelect: CallableFunction;
}) => {
  const { id, fullName, lastMessage, image, time, status } = message;
  const active = selected === id ? " bg-indigo-600" : "";
  return (
    <li className="py-1 sm:py-1 cursor-default">
      <div className={`flex items-center space-x-4 p-1 rounded${active}`} onClick={(e) => onSelect(id)}>
        <div className="flex-shrink-0">
          <img src={image} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-gray-900 truncate dark:text-white">{fullName}</p>
          <p className="text-base font-semibold text-gray-500 truncate dark:text-gray-400">{lastMessage}</p>
        </div>
        <div className="flex-0 max-w-10 items-center text-sm font-semibold">
          <span className={`text-green-500${status ? "" : " hidden"}`}>
            <svg width="20" height="20">
              <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
            </svg>
          </span>
          <p className="text-gray-500 truncate dark:text-gray-400">{time}</p>
        </div>
      </div>
    </li>
  );
};

export default FriendItem;
