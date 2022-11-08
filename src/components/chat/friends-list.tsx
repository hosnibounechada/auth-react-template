import { useChat } from "../../hooks";
import { FriendItem } from "./friend-item";

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

const FriendsList = ({ users }: { users: UsersList }) => {
  const { user, setUser } = useChat();

  const onSelect = (id: string) => {
    if (id === user?.id) return;
    setUser(users[id]);
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
            <FriendItem key={id} friend={friend} selected={user?.id!} onSelect={onSelect} />
          ))}
          ;
        </ul>
      </div>
    </div>
  );
};

export { FriendsList };
