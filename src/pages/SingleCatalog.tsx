/* default imports */
import React, { useState, useEffect } from "react";
import "./SingleCatalog.css";
import { Link } from "react-router-dom";
/* icons */
import { IoChevronBackOutline } from "react-icons/io5";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
/* components */
import mockData from "../assets/mockData/categoryMockData.json";
/* interfaces */

const SingleCatalog: React.FC = () => {
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [categories] = useState(mockData.categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subSubCategories, setSubSubCategories] = useState<any[]>([]);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [selectedPath, setSelectedPath] = useState("");

  // Update subcategories when a main category is selected
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((cat) => cat.name === selectedCategory);
      setSubCategories(category?.subcategories || []);
      setSelectedSubCategory("");
      setSubSubCategories([]);
      setSelectedSubSubCategory("");
    }
  }, [selectedCategory, categories]);

  // Update sub-subcategories when a subcategory is selected
  useEffect(() => {
    if (selectedSubCategory) {
      const subCategory = subCategories.find(
        (sub) => sub.name === selectedSubCategory
      );
      setSubSubCategories(subCategory?.subcategories || []);
      setSelectedSubSubCategory("");
    }
  }, [selectedSubCategory, subCategories]);

  // Update the selected path
  useEffect(() => {
    if (selectedCategory && selectedSubCategory && selectedSubSubCategory) {
      setSelectedPath(
        `${selectedCategory}/${selectedSubCategory}/${selectedSubSubCategory}`
      );
    }
  }, [selectedCategory, selectedSubCategory, selectedSubSubCategory]);

  // Search logic
  useEffect(() => {
    if (searchTerm) {
      categories.forEach((category) => {
        category.subcategories.forEach((subCategory) => {
          subCategory.subcategories.forEach((subSubCategory) => {
            if (
              searchTerm
                .toLowerCase()
                .includes(subSubCategory.name.toLowerCase())
            ) {
              setSelectedCategory(category.name);
              setSelectedSubCategory(subCategory.name);
              setSelectedSubSubCategory(subSubCategory.name);
            }
          });
        });
      });
    }
  }, [searchTerm, categories]);

  return (
    <div className="single_catalog_main_container w-[100vw] h-[100vh]">
      {/* header section start */}
      <div className="single_catalog_header">
        <div className="header_text_parent">
          <Link to={"/catalog-screen"} className="back_icon">
            <IoChevronBackOutline size={24} />
          </Link>
          <span className="single_catalog_header_title">
            Add Single Catalog
          </span>
        </div>
        <div className="header_text_parent help_right">
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
          <span className="need_help_btn_text text-[14px] font-medium text-[#2022a5]">
            Need Help?
          </span>
        </div>
      </div>
      {/* single catalog status section end */}
      {/* search section start */}
      <div className="search_section_main">
        <span className="search_placeholder_text text-[18px] font-medium pl-8">
          Search Category
        </span>
        <div className="search-container relative">
          <IoSearchOutline
            size={18}
            className="search_icon absolute left-10 top-3 text-center"
          />
          <input
            type="text"
            placeholder="Search for a  product or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="dropdown-container">
          <div className="dropdown">
            <h4>Main Category</h4>
            <ul>
              {categories.map((category) => (
                <li
                  key={category.name}
                  className={
                    selectedCategory === category.name ? "selected" : ""
                  }
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {subCategories.length > 0 && (
            <div className="dropdown">
              <h4>Subcategory</h4>
              <ul>
                {subCategories.map((subCategory) => (
                  <li
                    key={subCategory.name}
                    className={
                      selectedSubCategory === subCategory.name ? "selected" : ""
                    }
                    onClick={() => setSelectedSubCategory(subCategory.name)}
                  >
                    {subCategory.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {subSubCategories.length > 0 && (
            <div className="dropdown">
              <h4>Sub-Subcategory</h4>
              <ul>
                {subSubCategories.map((subSubCategory) => (
                  <li
                    key={subSubCategory.name}
                    className={
                      selectedSubSubCategory === subSubCategory.name
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      setSelectedSubSubCategory(subSubCategory.name)
                    }
                  >
                    {subSubCategory.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="selected-path">
          {selectedPath && <h4>{selectedPath}</h4>}
        </div>
      </div>
      {/* search section end */}
    </div>
  );
};

export default SingleCatalog;
