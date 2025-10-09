import React, { useState } from "react";

const countries = ["India", "Australia", "Nepal", "Bhutan"];
const students = ["Ram", "Shyam", "Ravi"];
const cities = [
  "Jaipur",
  "Udaipur",
  "Jodhpur",
  "Mumbai",
  "Pune",
  "Nagpur",
  "Melbourne",
  "Sydney",
  "Kathmandu",
  "Pokhara",
  "Thimphu City",
  "Paro Town",
];

const DropdownPreview = () => {
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  // Decide which array to show in preview dropdown
  let previewItems = [];
  if (category === "Country") previewItems = countries;
  else if (category === "Student") previewItems = students;
  else if (category === "City") previewItems = cities;

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Main Selector</h2>

      {/* Main Category Dropdown */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSelectedItem(""); // reset preview selection
        }}
      >
        <option value="">-- Select Category --</option>
        <option value="Country">Country</option>
        <option value="Student">Student</option>
        <option value="City">City</option>
      </select>

      {/* Preview Dropdown */}
      {category && (
        <div style={{ marginTop: "20px" }}>
          <h3>{category} Preview</h3>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value="">-- Select {category} --</option>
            {previewItems.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}

 
    </div>
  );
};

export default DropdownPreview;
