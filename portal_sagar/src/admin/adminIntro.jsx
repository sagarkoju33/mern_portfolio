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
    <div className="text-white">
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData?.intro}
      >
        <Form.Item
          name="welcomeText"
          label={<span className="text-white">Welcome Text</span>}
        >
          <input
            placeholder="Welcome Text"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item
          name="firstName"
          label={<span className="text-white">First Name</span>}
        >
          <input
            placeholder="First Name"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          label={<span className="text-white">Last Name</span>}
        >
          <input
            placeholder="Last Name"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item
          name="caption"
          label={<span className="text-white">Caption</span>}
        >
          <input
            placeholder="Caption"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label={<span className="text-white">Description</span>}
        >
          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
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
