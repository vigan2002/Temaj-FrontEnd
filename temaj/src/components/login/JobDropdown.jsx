import React, { useState, useRef, useEffect } from "react";
import { useField } from "formik";
import "./style.scss";

const JobDropdown = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleJobSelect = (job) => {
    helpers.setValue(job);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    if (!field.value) {
      helpers.setValue("Client");
    }
  }, [field.value, helpers]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-select" onClick={toggleDropdown}>
        {field.value || `${label}`}
      </div>
      {isDropdownVisible && (
        <div className="dropdown-menu">
          {["Client", "Architect"].map((job) => (
            <div
              key={job}
              className="dropdown-item"
              onClick={() => handleJobSelect(job)}
            >
              {job.charAt(0).toUpperCase() + job.slice(1)}
            </div>
          ))}
        </div>
      )}
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default JobDropdown;
