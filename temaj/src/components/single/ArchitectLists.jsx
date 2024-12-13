import React, { useState, useEffect, useRef } from "react";
import './discount.scss'
import { getAllArchitect } from "../../api/productApi";

const ArchitectLists = ({ label, onChange }) => {
  const [architects, setArchitects] = useState([]);
  const [selectedArchitect, setSelectedArchitect] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchArchitects = async () => {
      try {
        const response = await getAllArchitect();
        setArchitects(response);
      } catch (error) {
        console.error("Failed to fetch architects:", error);
      }
    };
    fetchArchitects();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleArchitectSelect = (architect) => {
    setSelectedArchitect(architect);
    setIsDropdownVisible(false);
    onChange(architect);
  };

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
    <div className="dropdown-arch" ref={dropdownRef}>
      <div className="dropdown-arch-select" onClick={toggleDropdown}>
      {selectedArchitect ? `${selectedArchitect.first_name} ${selectedArchitect.last_name}` : `${label}`}
      </div>
      {isDropdownVisible && (
        <div className="dropdown-arch-menu">
          {architects.length > 0 ? (
            architects.map((architect) => (
              <div
                key={architect.id}
                className="dropdown-arch-item"
                onClick={() => handleArchitectSelect(architect)}
              >
                {architect.first_name} {architect.last_name}
              </div>
            ))
          ) : (
            <div className="dropdown-arch-item">No architects available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArchitectLists;
