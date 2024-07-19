import React from "react";
import { Link } from "react-router-dom";
import { IoSearchCircleOutline } from "react-icons/io5";
import { AiOutlineQuestionCircle, AiOutlineBell } from "react-icons/ai";
import { useSelector } from "react-redux";
import './TeacherNavTop.css';

const TeacherNavTop = ({ handleSearch }) => {
  const userStore = useSelector((store) => store.UserReducer);

  return (
    <div className="teacher-nav-top">
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Anything"
            className="search-input"
            onChange={handleSearch}
          />
          <Link to="#">
            <IoSearchCircleOutline className="search-icon" />
          </Link>
        </div>
      </div>
      <div className="icon-section">
        <Link to="#">
          <AiOutlineQuestionCircle className="icon" />
        </Link>
        <Link to="#">
          <AiOutlineBell className="icon" />
        </Link>
        <div className="user-button">
          <span className="user-initial">{userStore?.name[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherNavTop;
