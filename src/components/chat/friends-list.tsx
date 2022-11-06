import { useState } from "react";
import FriendItem from "./friend-item";
import { friends } from "./data";

interface UsersMessages {
  displayName: string;
  id: string;
  lastMessage: string;
  sender: string;
  status: boolean;
  thumbnail: string;
  updatedAt: Date;
  viewed: boolean;
}

interface UsersList {
  [id: string]: {
    id: string;
    sender: string;
    displayName: string;
    thumbnail: string;
    lastMessage: string;
    time: Date;
    viewed: boolean;
    status: boolean;
  };
}

const FriendsList = ({ users, onSelect: onSelectUser }: { users: UsersList; onSelect: CallableFunction }) => {
  const [selected, setSelected] = useState("");

  const onSelect = (id: string) => {
    setSelected(id);
    const user = users[id];
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
          {Object.entries(users).map(([id, friend]) => (
            <FriendItem key={id} friend={friend} selected={selected} onSelect={onSelect} />
          ))}
          ;
        </ul>
      </div>
    </div>
  );
};

export default FriendsList;
