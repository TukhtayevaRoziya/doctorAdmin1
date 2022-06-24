import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { Content } from "antd/lib/layout/layout";

import { BreadcrumbHelpers } from "../../utility/Helpers";

export const List = () => {
  const [data, setData] = useState("");

  const columns = [
    { title: "Bemor ID", dataIndex: "bemorId", key: "bemorId" },
    { title: "Tavsif", dataIndex: "description", key: "description" },
    { title: "Sarlavha", dataIndex: "title", key: "title" },
  ];

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

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"construction"} from={"home"} />
        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
