import { useState } from "react";
import { useRequestPrivate } from "../../hooks";

const UserItem = ({ id, displayName, thumbnail, status }: { id: string; displayName: string; thumbnail: string; status: string }) => {
  const [userStatus, setUserStatus] = useState(status);

  const { doRequestPrivate: doSendRequest } = useRequestPrivate({ url: `/users/sendRequest/${id}`, method: "get" });
  const { doRequestPrivate: doUnSendRequest } = useRequestPrivate({ url: `/users/unSendRequest/${id}`, method: "get" });
  const { doRequestPrivate: doAcceptRequest } = useRequestPrivate({ url: `/users/acceptRequest/${id}`, method: "get" });
  const { doRequestPrivate: doRejectRequest } = useRequestPrivate({ url: `/users/rejectRequest/${id}`, method: "get" });
  const { doRequestPrivate: doUnfriendUser } = useRequestPrivate({ url: `/users/unfriendUser/${id}`, method: "get" });

  const sendRequest = async () => {
    const { success } = await doSendRequest();
    if (success) setUserStatus("invited");
  };

  const acceptRequest = async () => {
    const { success } = await doAcceptRequest();
    if (success) setUserStatus("friend");
  };

  const rejectRequest = async () => {
    const { success } = await doRejectRequest();
    if (success) setUserStatus("stranger");
  };

  const unfriendUser = async () => {
    const { success } = await doUnfriendUser();
    if (success) setUserStatus("stranger");
  };

  const unSendRequest = async () => {
    const { success } = await doUnSendRequest();
    if (success) setUserStatus("stranger");
  };

  return (
    <div className="flex flex-row items-center justify-between w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row items-center my-4">
        <img className=" w-20 h-20 rounded-full shadow-lg mx-4" src={thumbnail} alt="Bonnie" />
        <div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{displayName}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        </div>
      </div>
      <div className="flex flex-row space-x-3 mx-4">
        {userStatus === "friend" ? (
          <button
            onClick={unfriendUser}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unfriend
          </button>
        ) : userStatus === "invited" ? (
          <button
            onClick={unSendRequest}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cancel
          </button>
        ) : userStatus === "requested" ? (
          <div className="space-x-3">
            <button
              onClick={acceptRequest}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Accept
            </button>
            <button
              onClick={rejectRequest}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reject
            </button>
          </div>
        ) : (
          <button
            onClick={sendRequest}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add friend
          </button>
        )}
        <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
          Message
        </button>
      </div>
    </div>
  );
};

export default UserItem;
