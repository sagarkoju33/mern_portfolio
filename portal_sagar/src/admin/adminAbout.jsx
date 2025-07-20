import React, { useRef, useState, useEffect } from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/rootSlice";
import axios from "axios";
import { toast } from "react-toastify";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const fileInputRef = useRef();
  const [previewImage, setPreviewImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  // const [selectedImageFile, setSelectedImageFile] = useState(null);

  const onFinish = async (val) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-about", {
        ...val,
        _id: portfolioData.about._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (portfolioData?.about?.lottieURL) {
      setPreviewImage(portfolioData.about.lottieURL);
    }
  }, [portfolioData?.about?.lottieURL]);



  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);

    try {
      setImageUploading(true); // Start local button loading

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:5000/upload-file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {

        toast.success(response.data.message);
        setPreviewImage(response.data.url);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed: " + error.message);
    } finally {
      setImageUploading(false); // Stop local button loading
    }
  };



  return (
    <div className="text-white">
      {/* Display current image */}
      <div className="mb-4 text-center">
        {previewImage && (
          <img
            src={previewImage}
            alt="About"
            className="w-32 h-32 rounded-full mx-auto object-cover border border-white"
          />
        )}
        <button
          className="mt-2 px-4 py-1 bg-purple-700 text-white rounded disabled:opacity-50"
          onClick={() => fileInputRef.current.click()}
          disabled={imageUploading}
        >
          {imageUploading ? "Uploading..." : "Replace Image"}
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* About Form */}
      <Form onFinish={onFinish} layout="vertical" initialValues={portfolioData?.about}>
        <Form.Item name="name" label={<span className="text-white">Name</span>}>
          <input
            placeholder="Name"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item name="contactNumber" label={<span className="text-white">Contact Number</span>}>
          <input
            placeholder="Contact Number"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item name="emailAddress" label={<span className="text-white">Email Address</span>}>
          <input
            placeholder="Email Address"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item name="linkedln" label={<span className="text-white">LinkedIn Account URL</span>}>
          <input
            placeholder="LinkedIn Account URL"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item name="githubAccount" label={<span className="text-white">GitHub Account URL</span>}>
          <input
            placeholder="GitHub Account URL"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item name="description1" label={<span className="text-white">Description First</span>}>
          <textarea
            placeholder="Description First"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item name="description2" label={<span className="text-white">Description Second</span>}>
          <textarea
            placeholder="Description Second"
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

export default AdminAbout;
