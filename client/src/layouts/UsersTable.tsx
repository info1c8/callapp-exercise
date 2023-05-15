import { useEffect } from "react";
import { useUserStore } from "../store";

function UsersTable() {
  const { users, getUsers } = useUserStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {users.map((user) => {
        const { id, name } = user;

        return (
          <div key={id}>{name}</div>
        )
      })}
    </div>
  )
}

export default UsersTable;