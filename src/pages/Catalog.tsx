/* default imports */
import React from "react";
import "./Catalog.css";
import { useState } from "react";
/* components */
import Header from "../components/header";
import Sidebar from "../components/sidebar";

/* icons */

const Catalog: React.FC = () => {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  console.log("header value", showHeader);
  const handleMenuClick = () => {
    setShowHeader(!showHeader);
  };
  return (
    <div className="catalog_main_container">
      {showHeader ? (
        <Header onMenuClick={handleMenuClick} />
      ) : (
        <Sidebar onMenuClick={handleMenuClick} />
      )}
      <div className="catalog_body_container">
        <span className="catalog_instructions_heading">
          Steps to get started:
        </span>
        <div className="catalog_instructions_container">
          <span className="catalog_individual_instructions">
            Click on 'Catalog Upload' button in menu to upload your product.
          </span>
          <span className="catalog_individual_instructions">
            Click on 'Image Bulk Upload' button in menu to upload images for a
            product in bulk.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
