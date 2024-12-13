import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "./style.scss";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('sq');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    setIsDropdownVisible(false);
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

  const languages = [
    { code: "en", lang: "English", img: '/assets/images/icons/flags/uk.png' },
    { code: "sq", lang: "Albanian", img: '/assets/images/icons/flags/sq.png' },
  ];

  const currentLang = languages.find(lng => lng.code === currentLanguage);

  return (
    <div className="language-dropdown" ref={dropdownRef}>
      <button className="flag" onClick={toggleDropdown}>
        <img src={currentLang.img} alt={currentLang.lang} />
        <p>{currentLang.code}</p>
      </button>
      {isDropdownVisible && (
        <div className="dropdown-menu">
          {languages.filter(lng => lng.code !== currentLanguage).map(lng => (
            <button key={lng.code} className="flag" onClick={() => handleLanguageChange(lng.code)}>
              <img src={lng.img} alt={lng.lang} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
