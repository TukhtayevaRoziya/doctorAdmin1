import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { Content } from "antd/lib/layout/layout";

import { BreadcrumbHelpers } from "../../utility/Helpers";

export const DoctorList = () => {
  const [data, setData] = useState("");

  const columns = [
    { title: "Ism", dataIndex: "name", key: "name" },
    { title: "Diplom ID", dataIndex: "diplomid", key: "diplomid" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "user/all")
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"construction"} from={"home"} />
        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
