import { useState } from "react";
import FriendItem from "./friend-item";
import { friends } from "./data";

const FriendsList = ({ onSelect: onSelectUser }: { onSelect: CallableFunction }) => {
  const [selected, setSelected] = useState("");

  const onSelect = (id: string) => {
    setSelected(id);
    const user = friends[id];
    onSelectUser(user);
  };

  return (
    <div className="w-full max-w-md bg-white border shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4 p-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Friends List</h5>
        <a href="https://www.google.com" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </a>
      </div>
      <div className="flow-root h-[calc(100vh-134px)] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        <ul className="p-4 divide-y divide-gray-200 dark:divide-gray-700">
          {Object.entries(friends).map(([id, friend]) => (
            <FriendItem key={id} message={friend} selected={selected} onSelect={onSelect} />
          ))}
          ;
        </ul>
      </div>
    </div>
  );
};

export default FriendsList;
