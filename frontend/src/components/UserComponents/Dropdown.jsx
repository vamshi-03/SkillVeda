import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionUserLogout } from "../../Redux/UserReducer/actionType";
import { BiUserCircle } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { capitalizeFirstLetter } from "../../Redux/UserReducer/action";
import "./Dropdown.css";

const Dropdown = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.UserReducer);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    const token = userStore?.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post("http://localhost:5000/users/logout", {}, { headers })
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: "",
            name: "",
            role: "",
            token: "",
            isAuth: "",
            isError: "",
            loading: false,
            success: false,
            isUser: false,
            userId: "",
            place: "",
            age: "",
          })
        );
        dispatch(actionUserLogout());
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu when the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="dropdown-container">
      <button
        className="menu-button"
        onClick={toggleMenu}
      >
        <div className="flex-container">
          <span>Profile</span>
          <div className="icon-container">
            <FiMoreVertical />
          </div>
        </div>
      </button>
      <div className={`menu-list ${menuOpen ? "show" : ""}`}>
        <div className="user-options">
          <div className="user-details">
            {userStore?.role === "admin" || userStore?.role === "teacher" ? (
              <div className="flex-container">
                <div>
                  <FaUserShield size="2rem" color="#0056d2" />
                  <span className="role-text">
                    {capitalizeFirstLetter(userStore?.role)}
                  </span>
                </div>
                <h3 className="user-name">
                  {capitalizeFirstLetter(userStore?.name)}
                </h3>
              </div>
            ) : userStore?.role === "user" ? (
              <div className="flex-container">
                <BiUserCircle size="2rem" color="#0056d2" />
                <h3 className="user-name">
                  {capitalizeFirstLetter(userStore?.name)}
                </h3>
              </div>
            ) : null}
          </div>
          <button className="logout-button" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>

        {userStore?.role === "user" && (
          <div>
            <div className="menu-item" onClick={handleProfileClick}>
              Your Account
            </div>
            <Link to="/home" className="menu-item-link">
              <div className="menu-item">Dashboard</div>
            </Link>
          </div>
        )}

        {userStore?.role === "admin" && (
          <div>
            <Link to="/profile" className="menu-item-link">
              <div className="menu-item">Your Account</div>
            </Link>
            <Link to="/home" className="menu-item-link">
              <div className="menu-item">User Dashboard</div>
            </Link>
            <Link to="/admin/dashboard" className="menu-item-link">
              <div className="menu-item">Admin Dashboard</div>
            </Link>
            <Link to="/admin/courses" className="menu-item-link">
              <div className="menu-item">Courses</div>
            </Link>
            <Link to="/admin/users" className="menu-item-link">
              <div className="menu-item">Users</div>
            </Link>
            <Link to="/admin/Add" className="menu-item-link">
              <div className="menu-item">Add videos</div>
            </Link>
            <Link to="/admin/videos" className="menu-item-link">
              <div className="menu-item">All Videos</div>
            </Link>
            <Link to="/admin/discount" className="menu-item-link">
              <div className="menu-item">Discount</div>
            </Link>
            <Link to="/admin/giftcard" className="menu-item-link">
              <div className="menu-item">GiftCards</div>
            </Link>
            <Link to="/admin/statistic" className="menu-item-link">
              <div className="menu-item">Statistics</div>
            </Link>
            <Link to="/admin/setting" className="menu-item-link">
              <div className="menu-item">Settings</div>
            </Link>
          </div>
        )}

        {userStore?.role === "teacher" && (
          <div>
            <Link to="/profile" className="menu-item-link">
              <div className="menu-item">Your Account</div>
            </Link>
            <Link to="/home" className="menu-item-link">
              <div className="menu-item">User Dashboard</div>
            </Link>
            <Link to="/TeacherDashboard" className="menu-item-link">
              <div className="menu-item">Teacher Dashboard</div>
            </Link>
            <Link to="/Teacher/courses" className="menu-item-link">
              <div className="menu-item">Courses</div>
            </Link>
            <Link to="/Teacher/add" className="menu-item-link">
              <div className="menu-item">Add Videos</div>
            </Link>
            <Link to="/admin/setting" className="menu-item-link">
              <div className="menu-item">Settings</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
