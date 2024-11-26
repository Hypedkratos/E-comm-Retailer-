/* default imports */
import React from "react";
import "./header.css";

/* icons */
import { IoIosMenu } from "react-icons/io";
import { BiSupport } from "react-icons/bi";

/* interfaces */
interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="header_parent">
      {/* left part section start */}
      <div className="left_part">
        <div className="menu-icon-container" onClick={onMenuClick}>
          <IoIosMenu size={34} />
        </div>
        <div className="text-container">
          <h4 className="welcome_text">Welcome Guest</h4>
          <span className="welcome_sub_text">
            Let's get your business started in 3 steps
          </span>
        </div>
      </div>
      {/* left part section end */}
      {/* right part section start */}
      <div className="right_part">
        <div className="need_help_btn_container">
          <div className="icon_container">
            <BiSupport size={23} color="#013993" />
          </div>
          <span className="need_help_text">Need Help?</span>
        </div>
      </div>
      {/* right part section end */}
    </div>
  );
};

export default Header;
