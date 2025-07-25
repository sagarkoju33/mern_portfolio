import { Modal, Form, message } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ShowLoading, HideLoading, ReloadData } from "../redux/rootSlice";
import { toast } from "react-toastify";

function AdminExperience() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { portfolioData } = useSelector((state) => state.root);
  const experiences = portfolioData?.experience || [];
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);

  React.useEffect(() => {
    if (selectedItemForEdit) {
      form.setFieldsValue(selectedItemForEdit);
    } else {
      form.resetFields(); // ✅ Clears on Add
    }
  }, [selectedItemForEdit, form]);

  const onFinish = async (value) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-experience", {
          ...value,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-experience", value);
      }

      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message);

        // ✅ success message
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        toast.error(response.data.message); // ❌ error message
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message || "Something went wrong");
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-experience", {
        _id: item._id,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="text-white">
      <div className="flex justify-end mb-3">
        <button
          className="bg-green-400 text-white px-5 py-2 rounded-md"
          onClick={() => {
            form.resetFields();
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {experiences.map((experience, index) => {
          return (
            <div key={index} className="shadow border p-5 border-gray-400">
              <h1 className="text-primary text-xl font-bold h-10">
                {experience.period}
              </h1>
              <hr />
              <h1 className="text-md mt-3">Company : {experience.company}</h1>
              <h1 className="text-sm">Role : {experience.title}</h1>
              <h1 className="text-sm">{experience.description}</h1>
              <div className="flex justify-end gap-5 mt-5">
                <button
                  className="bg-red-500 text-white px-5 py-2 rounded-md"
                  onClick={() => {
                    onDelete(experience);
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-green-400 text-white px-5 py-2 rounded-md"
                  onClick={() => {
                    setSelectedItemForEdit(experience);
                    setShowAddEditModal(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        open={showAddEditModal}
        title={
          <span className="text-white">
            {selectedItemForEdit ? "Edit Experience" : "Add Experience"}
          </span>
        }
        footer={null}
        onCancel={() => {
          form.resetFields(); // ✅ Clear form when modal closes
          setSelectedItemForEdit(null);
          setShowAddEditModal(false);
        }}
        className="text-white"
        styles={{
          body: { backgroundColor: "#000515" }, // gray-800
          header: { backgroundColor: "#000515" },
          footer: { backgroundColor: "#000515" },
          content: { backgroundColor: "#000515" }, // important: controls main wrap
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedItemForEdit}
        >
          <Form.Item
            name="period"
            label={<span className="text-white">Period</span>}
          >
            <input
              className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
              placeholder="Period"
            />
          </Form.Item>
          <Form.Item
            name="company"
            label={<span className="text-white">Company</span>}
          >
            <input
              className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
              placeholder="Company"
            />
          </Form.Item>
          <Form.Item
            name="title"
            label={<span className="text-white">Title</span>}
          >
            <input
              className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
              placeholder="Title"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label={<span className="text-white">Description</span>}
          >
            <input
              className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
              placeholder="Description"
            />
          </Form.Item>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="border border-primary text-primary px-5 py-2"
              onClick={() => setShowAddEditModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-400 text-white px-5 py-2 rounded-md"
            >
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminExperience;
