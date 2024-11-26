/* default imports */
import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

/* icons */
import { IoCloseSharp } from "react-icons/io5";
import { GiShop } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { IoArrowUndo } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { FaRegCreditCard } from "react-icons/fa";
import { ImFolderUpload } from "react-icons/im";
import { FaImages } from "react-icons/fa";

/* interfaces */
interface SidebarProps {
  onMenuClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
  return (
    <div className="sidebar_parent">
      {/* close sidebar btn section start */}
      <div className="sidebar_close_btn" onClick={onMenuClick}>
        <IoCloseSharp size={20} color="white" className="close_icon" />
      </div>
      {/* close sidebar btn section end */}
      {/* profile section start */}
      <div className="profile_container relative">
        <div className="profile_image_container cursor-pointer">
          <GiShop size={26} color="#bababa" />
        </div>
        <span className="profile_name font-semibold text-[19px]">
          Mart2cart-
        </span>
        <div className="user_options_btn absolute right-6">
          <FaChevronDown className="cursor-pointer" />
        </div>
        <hr className="sepration_line absolute -bottom-4 left-0 w-[100%]" />
      </div>
      {/* profile section end */}
      {/* notice and support section start */}
      <div className="notice_support_container relative">
        <div className="notice_container text-[16px] font-normal cursor-pointer">
          <FaBell className="notification_icon relative" />
          Notices (6)
        </div>
        <div className="support_container text-[16px] font-normal cursor-pointer">
          <MdSupportAgent size={23} />
          Support
        </div>
        <hr className="sepration_line absolute -bottom-3 left-0 w-[100%]" />
      </div>
      {/* notice and support section end */}
      {/* sidiebar options section start */}
      <div className="sidebar_options">
        <div className="individual_option_container">
          <GiShop size={22} />
          <span className="option_name text-[16px] font-normal">Home</span>
        </div>
        <div className="individual_option_container">
          <GiShoppingBag size={22} />
          <span className="option_name text-[16px] font-normal">Orders</span>
        </div>
        <div className="individual_option_container">
          <IoArrowUndo size={22} />
          <span className="option_name text-[16px] font-normal">Returns</span>
        </div>
        <div className="individual_option_container">
          <HiMiniSquares2X2 size={22} />
          <span className="option_name text-[16px] font-normal">Inventory</span>
        </div>
        <div className="individual_option_container">
          <FaRegCreditCard size={22} />
          <span className="option_name text-[16px] font-normal">Payments</span>
        </div>
        <Link
          to={"/catalog"}
          className="individual_option_container text-white"
        >
          <ImFolderUpload size={22} />
          <span className="option_name text-[16px] font-normal">
            Catalog Upload
          </span>
        </Link>

        <Link
          to={"/bulk-upload"}
          className="individual_option_container text-white"
        >
          <FaImages size={22} />
          <span className="option_name text-[16px] font-normal">
            Image Bulk Upload
          </span>
        </Link>
      </div>
      {/* sidiebar options section end */}
    </div>
  );
};

export default Sidebar;
