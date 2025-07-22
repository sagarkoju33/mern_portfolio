// import React, { useState, useRef } from "react";

// function AdminSkill() {
//   const [skills, setSkills] = useState([]);

//   const fileInputRef = useRef(null);

//   const handleAddSkill = () => {
//     setSkills([...skills]);
//   };

//   const handleSkillChange = (id, field, value) => {
//     setSkills((prev) =>
//       prev.map((skill) =>
//         skill.id === id ? { ...skill, [field]: value } : skill
//       )
//     );
//   };

//   const handleImageUpload = (id, file) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setSkills((prev) =>
//         prev.map((skill) =>
//           skill.id === id ? { ...skill, image: reader.result } : skill
//         )
//       );
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   const removeSkill = (id) => {
//     setSkills((prev) => prev.filter((skill) => skill.id !== id));
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white space-y-4">
//       <h1 className="text-2xl font-bold mb-4">Manage Skills</h1>

//       {skills.map((skill) => (
//         <div
//           key={skill.id}
//           className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg"
//         >
//           {/* Skill image with upload */}
//           <div className="relative">
//             <img
//               src={skill.image || "https://via.placeholder.com/150"}
//               alt="Skill"
//               className="w-16 h-16 object-cover rounded-full border border-white cursor-pointer hover:opacity-80 transition"
//               onClick={() => {
//                 fileInputRef.current.click();
//                 fileInputRef.current.dataset.id = skill.id;
//               }}
//               title="Click to change image"
//             />
//           </div>

//           {/* Hidden file input */}
//           <input
//             type="file"
//             accept="image/*"
//             ref={fileInputRef}
//             className="hidden"
//             onChange={(e) => {
//               const file = e.target.files[0];
//               const id = e.target.dataset.id;
//               if (file && id) {
//                 handleImageUpload(id, file);
//               }
//             }}
//           />

//           {/* Skill name */}
//           <input
//             type="text"
//             placeholder="Skill Name"
//             value={skill.name}
//             onChange={(e) =>
//               handleSkillChange(skill.id, "name", e.target.value)
//             }
//             className="w-32 p-2 rounded bg-transparent border border-gray-600 text-white"
//           />

//           {/* Skill level */}
//           <input
//             type="text"
//             placeholder="Label"
//             value={skill.level}
//             onChange={(e) =>
//               handleSkillChange(skill.id, "level", e.target.value)
//             }
//             className="w-32 p-2 rounded bg-transparent border border-gray-600 text-white"
//           />

//           {/* Remove skill */}
//           <button
//             type="button"
//             onClick={() => removeSkill(skill.id)}
//             className="p-2 rounded hover:bg-red-600"
//             title="Remove Skill"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-red-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//       ))}

//       {/* Add new skill */}
//       <button
//         onClick={handleAddSkill}
//         className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
//       >
//         Add Skill
//       </button>
//     </div>
//   );
// }

// export default AdminSkill;
