import { useEffect, useState } from "react";
import { Table } from "antd";
import { IColumn } from "../interfaces";
import { enlargeFirstLetter, generateColumnKeys, generateDataKeys } from "../utils";
import { useUserStore } from "../store";

function UsersTable() {
  const { users, getUsers } = useUserStore();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const dataSource = generateDataKeys(users);

  useEffect(() => {
    getUsers();

    const firstObject = users[0];
    const cols = [];
    for (const key in firstObject) {
      const col = {
        title: enlargeFirstLetter(key),
        dataIndex: key,
      }
      cols.push(col);
    }
    const columns = generateColumnKeys(cols);
    setColumns(columns);
  }, []);

  return (
    <Table columns={columns} dataSource={dataSource}>

    </Table>
  )
}

export default UsersTable;