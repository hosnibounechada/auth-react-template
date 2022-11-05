import UserItem from "./user-item";

interface User {
  id: string;
  displayName: string;
  thumbnail: string;
  status: string;
}

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <div>
      {users.map(({ id, displayName, thumbnail, status }) => (
        <UserItem key={id} id={id} displayName={displayName} thumbnail={thumbnail} status={status} />
      ))}
    </div>
  );
};

export default UsersList;
