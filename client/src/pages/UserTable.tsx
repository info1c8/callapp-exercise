import { useEffect, useState } from "react";
import { Table, Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useUserStore } from "../store";
import { IColumn, IUser } from "../interfaces";
import { enlargeFirstLetter, generateColumnKeys, generateDataKeys, tabTitle } from "../utils";
import { AddressWrapper, ContentTitle } from "../components";

function UserTable() {
  const { users, getUsers, deleteUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<IColumn[]>([]);

  const dataSource = generateDataKeys(users);

  const handleDelete = (id: number) => {
    deleteUser(id);
  }

  useEffect(() => {
    setLoading(true);
    tabTitle("User Table");
    getUsers()
      .then(returnedUsers => {
        setLoading(false);
        const firstObject = returnedUsers[0];
        const cols = [];
        let count = 0;

        for (const key in firstObject) {
          let render = (value: any) => {
            return <ContentTitle>{String(value)}</ContentTitle>
          }
          if (typeof firstObject[key] === "object") {
            render = (value: any) => {
              return (
                <AddressWrapper>
                  {Object.keys(value).map(key => (
                    <ContentTitle>{key}: {value[key]}</ContentTitle>
                  ))}
                </AddressWrapper>
              )
            }
          }
          const col = {
            title: enlargeFirstLetter(key),
            dataIndex: key,
            render: render,
          }
          cols.push(col);

          count++;
          if (count === Object.keys(firstObject).length) {
            cols.push({
              title: "Actions",
              dataIndex: "actions",
              render: (_: any, record: IUser) => (
                <Popconfirm
                  title="Are you sure want to delete?"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button danger type="primary" icon={<DeleteOutlined />} />
                </Popconfirm>
              )
            });
          }
        }

        const columns = generateColumnKeys(cols);

        setColumns(columns);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      bordered
    >

    </Table>
  )
}

export default UserTable;