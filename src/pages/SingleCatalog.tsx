/* default imports */
import React from "react";
import "./SingleCatalog.css";
import { Link } from "react-router-dom";
/* icons */
import { IoChevronBackOutline } from "react-icons/io5";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
/* components */
/* interfaces */

const SingleCatalog: React.FC = () => {
  const [isAddProduct, setIsAddProduct] = React.useState(false);

  return (
    <div className="single_catalog_main_container w-[100vw] h-[100vh]">
      {/* header section start */}
      <div className="single_catalog_header">
        <div className="header_text_parent">
          <Link to={"/catalog-screen"}>
            <IoChevronBackOutline size={24} />
          </Link>
          <span className="single_catalog_header_title">
            Add Single Catalog
          </span>
        </div>
        <div className="header_text_parent">
          <TbBrandYoutubeFilled
            size={28}
            color="red"
            className="youtube_icon"
          />
          <Link to={"https://youtu.be/KMkx4uYETWE?si=6toGffXKq5kLNG5O"}>
            <span className="single_catalog_header_text">
              Learn to upload single catalog ?
            </span>
          </Link>
        </div>
      </div>
      {/* header section end */}
      {/* single catalog status section start */}
      <div className="single_catalog_status_parent">
        <div className="status_container">
          <div
            className={`status select_product ${
              !isAddProduct && "status_active"
            }`}
          >
            <div
              className={`status_number ${
                !isAddProduct && "status_number_selected"
              }`}
            >
              1
            </div>
            Select Category
          </div>
          <div
            className={`status select_product ${
              isAddProduct && "status_active"
            }`}
          >
            <div
              className={`status_number ${
                !isAddProduct && "status_number_selected"
              }`}
            >
              2
            </div>
            Add Product Details
          </div>
        </div>
        <div className="need_help_btn">
          <BiSupport size={22} color="#2022a5" />
          <span className="text-[14px] font-medium text-[#2022a5]">
            Need Help?
          </span>
        </div>
      </div>
      {/* single catalog status section end */}
    </div>
  );
};

export default SingleCatalog;
