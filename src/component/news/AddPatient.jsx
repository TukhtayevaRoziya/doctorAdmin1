import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import AddBoxIcon from "@mui/icons-material/AddBox";

import axios from "axios";
import { DeleteOutlined } from '@ant-design/icons';

export const AddPatient = () => {
  const [createVisible, setCreateVisible] = useState(false);

  const [form] = Form.useForm();
  const [data, setData] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    axios
      .get("https://medicalapp-api-uz.herokuapp.com/api/user/history/all")
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const showCreateModal = () => {
    setCreateVisible(true);
  };

  const showModal = (id) => {
    console.log(id._id);
    setVisible(true);
    setSelectedID(id._id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    axios.delete(`https://medicalapp-api-uz.herokuapp.com/api/user/history/${selectedID}`).then((res)=>{
      console.log(res);
      axios
      .get("https://medicalapp-api-uz.herokuapp.com/api/user/history/all")
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    // dispatch(deleteAction("userComment", DELETE_USER_COMMENT, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      // dispatch(getAction("userComment", GET_USER_COMMENT));
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false)
        axios
        .post("https://medicalapp-api-uz.herokuapp.com/api/user/history/create", values)
          .then((res) => {
            axios
            .get("https://medicalapp-api-uz.herokuapp.com/api/user/history/all")
            .then(function (response) {
              setData(response.data.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const createHandleCancel = () => {
    setCreateVisible(false);
  };

  const columns = [
    { title: "Bemor ID", dataIndex: "bemorId", key: "bemorId" },
    { title: "Tavsif", dataIndex: "description", key: "description" },
    { title: "Sarlavha", dataIndex: "title", key: "title" },
    {
      title: (
        <>
          <Button type="primary" onClick={showCreateModal}>
            <AddBoxIcon />
          </Button>
          <Modal
            title={"Yaratish"}
            visible={createVisible}
            onOk={createHandleOk}
            onCancel={createHandleCancel}
            okText={"yaratish"}
            cancelText={"bekor qilish"}
            htmlType="submit"
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: "public",
              }}
            >
              <FieldHelpers
                label="Bemor ID"
                name="bemorId"
                message="Iltimos Bemor Id qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Tavsif"
                name="description"
                message="Iltimos Tavsif qatorini yo'ldiring!"
              />

              <FieldHelpers
                label="Sarlavha"
                name="title"
                message="Iltimos Sarlavha qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
      dataIndex: "",
      key: "x",
      render: (text) => (
        
        <>
          <Button type="danger" onClick={(e) => showModal(text)}>
            <DeleteOutlined />
          </Button>
          <Modal
            title={"O'chirish"}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText={"o'chirish"}
            okType={"danger"}
            cancelText={"bekor qilish"}
          >
            <h2>Haqiqatan ham bu ma'lumotni o'chirib tashlamoqchimisiz?</h2>
            <p>
              Agar siz ushbu ma'lumotlarni o'chirib tashlasangiz, qayta
              tiklanmaydi
            </p>
          </Modal>
        </>
      ),
    }
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"news"} from={"home"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
