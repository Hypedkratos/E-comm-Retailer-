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
    </div>
  );
};

export default Catalog;
