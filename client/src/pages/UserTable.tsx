import { useEffect, useState } from "react";
import { Table } from "antd";
import { useUserStore } from "../store";
import { IColumn, IUser } from "../interfaces";
import { enlargeFirstLetter, generateColumnKeys, generateDataKeys, tabTitle } from "../utils";
import { AddressWrapper, ContentTitle } from "../components";

function UserTable() {
  const { users, getUsers } = useUserStore();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [dataSource, setDataSource] = useState<IUser[]>([]);

  useEffect(() => {
    tabTitle("User Table");
    getUsers()
      .then(returnedUsers => {
        const firstObject = returnedUsers[0];
        const cols = [];

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
        }

        const columns = generateColumnKeys(cols);
        const dataSource = generateDataKeys(returnedUsers);

        setColumns(columns);
        setDataSource(dataSource);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Table columns={columns} dataSource={dataSource}>

    </Table>
  )
}

export default UserTable;