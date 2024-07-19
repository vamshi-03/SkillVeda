import React, { useState } from "react";
import { FaSearch, FaBars, FaWeight } from "react-icons/fa";
import Dropdown from "./Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import {NavBarDrawer} from "../NavBarDrawer";
import { showToast } from "../SignUp";
import "./UserNavbar.css"; // Import your CSS file

const UserNavbar = () => {
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  function home() {
    navigate("/home");
  }

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={home}>
          <span className="logo-text">SkillVeda</span>
        </div>

        {!isMobile ? (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="What do you want to learn?"
            />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
        ) : (
          <button className="menu-button" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
        )}

        {!isMobile && (
          <div className="navbar-links">
            {/* <a className="teach-link" href="/Teachme">
              {user.role !== 'teacher' && user.role !== 'admin' && 'Teach On SkillVeda'}
            </a> */}
            <Dropdown />
          </div>
        )}
      </div>
      <NavBarDrawer isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default UserNavbar;
