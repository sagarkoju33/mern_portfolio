import React from "react";
import { Form } from "antd";
import { useSelector } from "react-redux";

function AdminIntro() {
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = (val) => {
    console.log(val);
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.intro}
      >
        <Form.Item name="welcomeText" label="Welcome Text">
          <input placeholder="Welcome Text"></input>
        </Form.Item>
        <Form.Item name="firstName" label="First Name">
          <input placeholder="First Name"></input>
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <input placeholder="Last Name"></input>
        </Form.Item>
        <Form.Item name="caption" label="Caption">
          <input placeholder="Caption"></input>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <textarea placeholder="Description" />
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-10 py-2 bg-purple-700 text-white">SAVE</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
