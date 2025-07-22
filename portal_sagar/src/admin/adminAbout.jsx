import React, { useRef, useState, useEffect } from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/rootSlice";
import axios from "axios";
import { toast } from "react-toastify";
import defaultSkillImage from "../assets/download.jpg";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const profileFileInputRef = useRef();
  const [skillFileInputRefs, setSkillFileInputRefs] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const [profileImageUploading, setProfileImageUploading] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (portfolioData?.profilePicture?.file_url) {
      setPreviewImage(portfolioData.profilePicture.file_url);
    }

    if (
      portfolioData?.about?.skills &&
      Array.isArray(portfolioData.about.skills)
    ) {
      const skillsWithId = portfolioData.about.skills.map((skill, index) => ({
        id: skill.id || index,
        image: skill.image || "",
        preview: skill.image || "", // this will be used in <img src=...>
        name: skill.name || "",
        level: skill.level || "",
      }));

      setSkills((prevSkills) => {
        // Prevent overwriting user-edited skills after hot reload
        const isUnchanged =
          JSON.stringify(prevSkills.map((s) => s.id)) ===
          JSON.stringify(skillsWithId.map((s) => s.id));

        if (isUnchanged) return prevSkills;
        return skillsWithId;
      });

      setSkillFileInputRefs((prevRefs) => {
        const newRefs = { ...prevRefs };
        skillsWithId.forEach((skill) => {
          if (!newRefs[skill.id]) {
            newRefs[skill.id] = React.createRef();
          }
        });
        return newRefs;
      });
    }
  }, [portfolioData]);


  // Handle profile image upload
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);

    try {
      setProfileImageUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("isProfile", true); // ✅ Send as string

      const response = await axios.post(
        "http://localhost:5000/upload-file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Optionally use the returned file URL
        // setPreviewImage(response.data.data.file_url);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed: " + error.message);
    } finally {
      setProfileImageUploading(false);
    }
  };


  const handleSkillImageChange = (skillId) => async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);

    // Step 1: Immediately show the local preview
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === skillId
          ? {
            ...skill,
            preview: localUrl, // used for <img src=...>
            localFile: file,

          }
          : skill
      )
    );

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/upload-file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success && response.data.data?.file_url) {
        const fileUrl = response.data.data.file_url;

        // Step 2: Save uploaded URL in both 'image' and 'preview'
        setSkills((prevSkills) =>
          prevSkills.map((skill) =>
            skill.id === skillId
              ? {
                ...skill,
                image: fileUrl, // backend-usable image URL
                preview: fileUrl,

                // replace local preview with uploaded one
              }
              : skill
          )
        );

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    }
  };

  // Add a new empty skill row
  const handleAddSkill = () => {
    const newSkill = { id: Date.now(), image: "", name: "", level: "" };
    setSkills((prevSkills) => [...prevSkills, newSkill]);

    // Add a new ref for the new skill
    setSkillFileInputRefs((prevRefs) => ({
      ...prevRefs,
      [newSkill.id]: React.createRef(),
    }));
  };

  // Handle skill input changes
  const handleSkillChange = (id, field, value) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };



  // Submit handler for the About form + skills
  const onFinish = async (val) => {
    try {
      dispatch(ShowLoading());

      const payload = {
        ...val,
        _id: portfolioData.about._id,
        skills,
      };

      const response = await axios.post("/api/portfolio/update-about", payload);
      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        // getPortfolioData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="text-white max-w-3xl mx-auto">
      {/* Profile Image Section */}
      <div className="mb-6 text-center">
        {previewImage && (
          <img
            src={previewImage}
            alt="About"
            className="w-32 h-32 rounded-full mx-auto object-cover border border-white"
          />
        )}

        <button
          className="mt-2 px-4 py-1 bg-purple-700 text-white rounded disabled:opacity-50"
          onClick={() => profileFileInputRef.current.click()}
          disabled={profileImageUploading}
        >
          {profileImageUploading ? "Uploading..." : "Replace Image"}
        </button>

        <input
          type="file"
          accept="image/*"
          ref={profileFileInputRef}
          onChange={handleProfileImageChange}
          className="hidden"
        />
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h3 className="mb-4 text-white font-semibold text-lg">Skills</h3>

        {skills.length === 0 && (
          <p className="text-gray-400">No skills added yet. Add one below.</p>
        )}

        <div className="space-y-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-wrap md:flex-nowrap items-center gap-4 bg-gray-800 p-4 rounded"
            >
              <img
                src={skill.preview || skill.image || defaultSkillImage}
                alt={skill.name}
                className="w-16 h-16 rounded-full object-cover border border-gray-300 cursor-pointer hover:opacity-80 transition"
                title="Click to change image"
                onClick={() => skillFileInputRefs[skill.id]?.current?.click()}
              />



              {/* <img
                src={
                  skill.preview ||
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACUCAMAAADhypYgAAAAYFBMVEX///8AAAAzMzPNzc23t7f6+vqYmJjy8vIGBgacnJwMDAxlZWUZGRns7Oyvr69fX18pKSlCQkIhISFubm5WVlZISEjAwMA6Ojp7e3vi4uLa2tpzc3NNTU3GxsaNjY2Hh4eSJ7+1AAAFBklEQVR4nO2c66KyKhBA07TS8lqptXP3/m/5dRVUQIQZZJ/D+rkvyBKFYQBXK4fD4XA4HA6Hw+Gwm+06SNNIwEYBUXlP0rS9hpAS0engLcXOP1YwGslxt5jFhzwC8AiWawyKc6LrkS7eHG9yTZO1JR6eV+iJ+EvXn7DR8UiXrj3FQacjPi9de5pU3WNrzRvy5KQuElDFlE2wviTJ5cv1yxqPNogyci8P6iIN8fiBDBXmcI27OlyUCzlBNKsu5G6qhypFV8YVsGYzIc+3eqCSf4vIASs2l2sn8qtcRmnBk7VKOpG7chldvHgErNhctp1Io1xGJ/IDWLG5OBGK/8yjFQtEwqC5+XleHNOtRi0lwBXZNmTiGO/Vh1wJQEX2g1+k/fnvTr1jnAZT5OgNOeM9X0REvcvhiOxHHp7no5ngidwZHo820a4xB1CRjPohLx+hHgmJQRPhTX9j7dQTGyyRNcdDp1MRQkTUh+XuIaJExj3WF600Bx9QESqML5kSL1qAao9BEkmYCm9wXnckkVYgghNaIomIco+ZoKgRbSoZoS0gMozIBLTPdEAmFQ1AiHRFEJFKICLf/0bvW5TLNAoRmXGjBjBERC+7dHI2+v5HKWECKnIjP8s9HjvZuJF6PCXWb7BEGo/HjV9Qj94i2LQJlkjCzdBLZjSDfgGT8T+WCLdJJOP4YHgj6gkTNJGQ/ZbEcsNCNW7QCRM0kdU6HtXFk+2yKtb/ik3wRJi1kcuUMz08rxCZIIqs2uEmglijPV4mghkAgEjYFTF8kZNTvx5yyydcD6EJqsijUmTGWwRyxQk8RE8Xsshqddnsz/V5H8mmGYUeAhN0kZlMePBNiMisaQINpMhoHJQ2sUtEwoNnYpWIlAdnZCQTh+VFJD3YJqAiepulZmxeY5jYIzJrE97YxBqRmZsJRya2iMzeuzY0sUQkYtV1lokdIgoeQxOjIlFdMAN5JY+HCZ2RMCnyWmpg5AEVPfq5FYMinyWT03BOoezxaBNSljmRbulnsEat4UFPnY2JUIvVvWd7o+NBTa5NifQW3Usy5/3V8qCuaEgk618//kx7Q/5So50i2agGx+eLcq01PbwaR4QTxocnRhXirLnp7+A2KsL0AMJniGAlHzA9qA266CKoHgZFcD3MiSB7eGV3JcwkNr6HMZHx+PE3RdA9qFMvmCK68YctIvwV6r8lohnXWiOiNV9aWoTaQWfo0CtLBHR3kKlDr+giAeuqf1GEtZ0cV4QESqAi/F1ONoswtgJOLWlCQUIUUJFs/KO/LmKqRch8hIio741niJh6R6izqDgiN0MiJPkAKkKCA/YpGHhIOghJRLSlHBIqJQggwjiaFBp626kwtbudsKfeDA3t1MkHJJHESL+VUYtGkCL0UBSmTXOPgqqqghfpJIEE1Ye2baugTZi1wDmraw4nwihiURHId0R5ZQIAEmsBHMyvp/8WDXLwEeArHNJHQxAgq8Pq30WpAW6GNmTcktxfzICk3GOcw5ISUGnNNUQhux/1YtQJqQ3f3k79CG0/9xPndV37fv6gfHNgUdLkPMoxn9/4/uMydVGcb0Xei1A1ehxToa4cOh+WMJXFkkLnWx9Xi77dpjcom1gKkUPyDBePsJi+hBk0vgn4YmvHFw53uh6PNvm1oOuqQQax5G4qK8cmPqnHJkMuabO/FXUfH57BFYrz6WfTLvVhRYfD4XA4HA6Hw+H4n/EP9uVhuD1Pj3IAAAAASUVORK5CYII="
                }
                alt={skill.preview}
                className="w-16 h-16 rounded-full object-cover border border-gray-300 cursor-pointer hover:opacity-80 transition"
                title="Click to change image"
                onClick={() => skillFileInputRefs[skill.id]?.current?.click()}
              /> */}

              <input
                type="text"
                placeholder="Skill Name"
                value={skill.name}
                onChange={(e) =>
                  handleSkillChange(skill.id, "name", e.target.value)
                }
                className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
              />
              <input
                type="text"
                placeholder="Label"
                value={skill.level}
                onChange={(e) =>
                  handleSkillChange(skill.id, "level", e.target.value)
                }
                className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
              />
              <button
                type="button"
                onClick={() =>
                  setSkills((prevSkills) =>
                    prevSkills.filter((s) => s.id !== skill.id)
                  )
                }
                className="p-1 rounded hover:bg-red-600"
                title="Remove Skill"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {/* Hidden file input per skill */}
              <input
                type="file"
                accept="image/*"
                ref={skillFileInputRefs[skill.id]}
                onChange={handleSkillImageChange(skill.id)}
                className="hidden"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddSkill}
          className="mt-4 flex items-center space-x-2 px-4 py-2 bg-purple-700 rounded hover:bg-purple-800"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add Skill</span>
        </button>
      </div>

      {/* About Form */}
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData?.about}
        className="space-y-4"
      >
        <Form.Item name="name" label={<span className="text-white">Name</span>}>
          <input
            placeholder="Name"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item
          name="contactNumber"
          label={<span className="text-white">Contact Number</span>}
        >
          <input
            placeholder="Contact Number"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item
          name="emailAddress"
          label={<span className="text-white">Email Address</span>}
        >
          <input
            placeholder="Email Address"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item
          name="linkedln"
          label={<span className="text-white">LinkedIn Account URL</span>}
        >
          <input
            placeholder="LinkedIn Account URL"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label={<span className="text-white">About Yourself</span>}
        >
          <textarea
            placeholder="About Yourself"
            className="w-full border p-2 rounded bg-transparent text-white placeholder-white"
          />
        </Form.Item>

        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-purple-700 rounded hover:bg-purple-800"
        >
          Save
        </button>
      </Form>
    </div>
  );
}

export default AdminAbout;
