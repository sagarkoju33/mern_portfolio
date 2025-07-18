import React from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/rootSlice";
import axios from "axios";
import { toast } from "react-toastify";

function AdminIntro() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (val) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-intro", {
        ...val,
        _id: portfolioData.intro._id,
      });
      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message); // ✅ success message
      } else {
        toast.error(response.data.message); // ❌ error message
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData?.intro}
      >
        <Form.Item name="welcomeText" label="Welcome Text">
          <input
            placeholder="Welcome Text"
            className="w-full border p-2 rounded"
          />
        </Form.Item>
        <Form.Item name="firstName" label="First Name">
          <input
            placeholder="First Name"
            className="w-full border p-2 rounded"
          />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <input
            placeholder="Last Name"
            className="w-full border p-2 rounded"
          />
        </Form.Item>
        <Form.Item name="caption" label="Caption">
          <input placeholder="Caption" className="w-full border p-2 rounded" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded"
          />
        </Form.Item>

        <div className="flex justify-end w-full">
          <button className="px-10 py-2 bg-purple-700 text-white" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
