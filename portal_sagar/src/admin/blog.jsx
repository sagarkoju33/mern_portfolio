import { Modal, Form, message, DatePicker } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ShowLoading, HideLoading, ReloadData } from "../redux/rootSlice";
import { toast } from "react-toastify";
import { BASE_URL } from "./env";
import dayjs from "dayjs";

function AdminBlogs() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { portfolioData } = useSelector((state) => state.root);
  const blogs = portfolioData?.blogs || [];
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  // React.useEffect(() => {
  //   if (selectedItemForEdit) {
  //     form.setFieldsValue(selectedItemForEdit);
  //   } else {
  //     form.resetFields(); // ✅ Clears on Add
  //   }
  // }, [selectedItemForEdit, form]);
  React.useEffect(() => {
    if (showAddEditModal) {
      const savedPreview = localStorage.getItem("imagePreview");
      if (savedPreview) {
        setPreview(savedPreview);
      }
    }
  }, [showAddEditModal]);
  React.useEffect(() => {
    if (selectedItemForEdit) {
      const datetimeVal = selectedItemForEdit.datetime
        ? dayjs(selectedItemForEdit.datetime)
        : null;
      form.setFieldsValue({
        ...selectedItemForEdit,
        datetime: datetimeVal,
      });

      // Clear previous preview and set preview to existing blog image
      setPreview(selectedItemForEdit.imageUrl || null);
      localStorage.removeItem("imagePreview"); // Clear old preview
    } else {
      form.resetFields();
      setPreview(null);
      localStorage.removeItem("imagePreview");
    }
  }, [selectedItemForEdit, form]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Base64 string for preview
        localStorage.setItem("imagePreview", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      // Create FormData instance to hold text fields + file
      const formData = new FormData();

      // Append all form fields (except image)
      formData.append("title", values.title); // assuming 'degree' is title
      formData.append("description", values.description);
      formData.append("datetime", values.datetime?.format("YYYY-MM-DD")); // DatePicker value is a moment/dayjs object
      formData.append("link", values.link);

      // Append the file - values.image is a FileList or array from Upload component
      // If native input file (FileList):
      if (values.imageUrl && values.imageUrl.length > 0) {
        formData.append("imageBanner", values.imageUrl[0]);
      }

      let response;
      if (selectedItemForEdit) {
        formData.append("_id", selectedItemForEdit._id);
        response = await axios.post(
          `${BASE_URL}/api/portfolio/update-blog`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post(
          `${BASE_URL}/api/portfolio/submit-blog`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(ReloadData(true));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message || "Something went wrong");
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "${BASE_URL}/api/portfolio/delete-blog",
        {
          _id: item._id,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        toast.error(response.data.message);
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
          Add Blog
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {blogs.map((blog, index) => {
          return (
            <div key={index} className="shadow border p-5 border-gray-400">
              <h1 className="text-primary text-xl font-bold h-10">
                Date: {blog.datetime?.substring(0, 10)}
              </h1>

              <hr />
              <h1 className="text-md mt-3">Description : {blog.description}</h1>
              <h1 className="text-sm" style={{ wordBreak: "break-word" }}>
                Link : {blog.link}
              </h1>

              <div className="flex justify-end gap-5 mt-5">
                <button
                  className="bg-red-500 text-white px-5 py-2 rounded-md"
                  onClick={() => {
                    onDelete(blog);
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-green-400 text-white px-5 py-2 rounded-md"
                  onClick={() => {
                    setSelectedItemForEdit(blog);
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
            {selectedItemForEdit ? "Edit Blog" : "Add Blog"}
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
          // initialValues={selectedItemForEdit}
        >
          <Form.Item
            name="datetime"
            label={<span className="text-white">Date</span>}
          >
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Date"
              className="white-placeholder w-full border p-2 rounded bg-transparent text-white"
              style={{
                backgroundColor: "transparent",
                borderColor: "white",
                color: "white",
              }}
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
            name="link"
            label={<span className="text-white">Link</span>}
          >
            <input
              className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
              placeholder="Link"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label={<span className="text-white">Description</span>}
          >
            <textarea
              className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label={<span className="text-white">Image</span>}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.target?.files;
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
            />
          </Form.Item>
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded shadow-lg object-cover"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-3">
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

export default AdminBlogs;
