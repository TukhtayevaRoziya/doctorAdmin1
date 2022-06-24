import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import AddBoxIcon from "@mui/icons-material/AddBox";

import axios from "axios";

export const AddPatient = () => {
  const [createVisible, setCreateVisible] = useState(false);

  const [form] = Form.useForm();
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "user/history/all")
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

  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false)
        axios
        .post(process.env.REACT_APP_API_URL + "user/history/create", values)
          .then((res) => {
            axios
            .get(process.env.REACT_APP_API_URL + "user/history/all")
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
    },
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
