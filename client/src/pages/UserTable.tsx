import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table, Popconfirm, Button, Modal, Input, Select } from "antd";
import { DeleteOutlined, FlagOutlined, HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useUserStore } from "../store";
import { IColumn, IUser } from "../interfaces";
import { ToastNote } from "../layouts";
import { enlargeFirstLetter, generateColumnKeys, generateDataKeys, tabTitle } from "../utils";
import { AddressWrapper, ContentTitle } from "../components";

function UserTable() {
  const { users, getUsers, updateUser, deleteUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<IColumn[]>([]);

  const [selectedRow, setSelectedRow] = useState<IUser>();
  const [inputValues, setInputValues] = useState<IUser>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleRowDoubleClick = (rowData: IUser) => {
    setSelectedRow(rowData);
    setInputValues(rowData);
    setIsModalOpen(true);
  }

  const handleInputChange = (name: string, value: string) => {
    setInputValues((prevValues) => {
      return ({
        ...prevValues,
        [name]: value,
      });
    });
  }

  const handleAddressChange = (key: string, value: string) => {
    setInputValues((prevValues) => {
      return ({
        ...prevValues,
        address: {
          ...prevValues?.address,
          [key]: value,
        }
      })
    });
  }
  
  const handleSave = () => {
    const updatedData = {
      ...selectedRow,
      ...inputValues,
    }

    updateUser(selectedRow?.id, updatedData)
      .then(response => {
        toast.success(`User with ID ${response.user.id} updated successfully`);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });

    setIsModalOpen(false);
  };

  const dataSource = generateDataKeys(users);

  const handleDelete = (id: number | undefined) => {
    deleteUser(id)
      .then(response => {
        toast.success(response.message);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  }

  useEffect(() => {
    setLoading(true);
    tabTitle("User Table");
    getUsers()
      .then(response => {
        setLoading(false);
        const firstObject = response.users[0];
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

  const genders = ["male", "female"];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        bordered
        onRow={(record) => ({
          onDoubleClick: () => handleRowDoubleClick(record),
        })}
      >
      </Table>
      <Modal
        title="Do you want to save data?"
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
      >
        <Input
          name="name"
          placeholder="Name"
          value={inputValues?.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          addonBefore={<UserOutlined />}
          allowClear
        />
        <Input
          name="email"
          placeholder="Email"
          value={inputValues?.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          addonBefore={<MailOutlined />}
          allowClear
        />
        <Select 
          placeholder="Select gender"
          value={inputValues?.gender}
          onChange={(value) => handleInputChange("gender", value)}
          options={genders.map(gender => ({ label: gender, value: gender }))}
          style={{ width: "100%" }}
        />
        <Input
          name="city"
          placeholder="City"
          value={inputValues?.address?.city}
          onChange={(e) => handleAddressChange("city", e.target.value)}
          addonBefore={<HomeOutlined />}
          allowClear
        />
        <Input
          name="street"
          placeholder="Street"
          value={inputValues?.address?.street}
          onChange={(e) => handleAddressChange("street", e.target.value)}
          addonBefore={<FlagOutlined />}
          allowClear
        />
        <Input
          name="phone"
          placeholder="Phone"
          value={inputValues?.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          addonBefore={<PhoneOutlined />}
          allowClear
        />
        <Button 
          type="primary" 
          onClick={handleSave} 
          style={{ width: "100px" }}
        >
          Save
        </Button>
      </Modal>
      <ToastNote />
    </>
  )
}

export default UserTable;