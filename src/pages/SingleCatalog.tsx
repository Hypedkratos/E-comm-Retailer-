/* default imports */
import React, { useState, useEffect } from "react";
import "./SingleCatalog.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
/* icons */
import { IoChevronBackOutline, IoSearchOutline } from "react-icons/io5";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { MdFileUpload } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
/* components */
import mockData from "../assets/mockData/categoryMockData.json";
/* interfaces */

const SingleCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [categories] = useState(mockData.categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subSubCategories, setSubSubCategories] = useState<any[]>([]);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [selectedPath, setSelectedPath] = useState("");
  const [isImgSelected, setIsImgSelected] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      let found = false;

      for (const category of categories) {
        for (const subCategory of category.subcategories) {
          for (const subSubCategory of subCategory.subcategories) {
            if (
              subSubCategory.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              setSelectedCategory(category.name);
              setSelectedSubCategory(subCategory.name);
              setSelectedSubSubCategory(subSubCategory.name);
              found = true;
              break;
            }
          }
          if (found) break;
        }
        if (found) break;
      }

      if (!found) {
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedSubSubCategory("");
        setSelectedPath("");
      }
    }
  }, [searchTerm, categories]);

  // functions
  const handleImageUpload = (e) => {
    if (selectedPath == "") {
      alert("Please select a category first");
    } else {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
      setIsImgSelected(true);
      setIsAddProduct(true);
    }
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 6000);
  };

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
            {isAddProduct ? (
              <FaCircleCheck size={22} color="#2ba52b" />
            ) : (
              <div className="status_number">1</div>
            )}
            Select Category
          </div>
          <div
            className={`status select_product ${
              isAddProduct && "status_active"
            }`}
          >
            <div className="status_number">2</div>
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
      {!isAddProduct && (
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
              id="search-input"
              type="text"
              placeholder="Search for a product or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="dropdown-container">
            <div className="dropdown">
              <ul>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className={`${
                      selectedCategory === category.name ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setSubCategories(category.subcategories || []);
                      setSubSubCategories([]);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>

            {subCategories.length > 0 && (
              <div className="dropdown">
                <ul>
                  {subCategories.map((subCategory, index) => (
                    <li
                      key={index}
                      className={`${
                        selectedSubCategory === subCategory.name
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedSubCategory(subCategory.name);
                        setSubSubCategories(subCategory.subcategories || []);
                      }}
                    >
                      {subCategory.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {subSubCategories.length > 0 && (
              <div className="dropdown">
                <ul>
                  {subSubCategories.map((subSubCategory, index) => (
                    <li
                      key={index}
                      className={`${
                        selectedSubSubCategory === subSubCategory.name
                          ? "selected"
                          : ""
                      }`}
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

            <div className="image_upload_section">
              <div className="bg-gray-200 path_container">
                {selectedPath ? (
                  <h4>{selectedPath}</h4>
                ) : (
                  "No category or subcategory selected"
                )}
              </div>
              <div className="image_text_container">
                {!isImgSelected && (
                  <>
                    <img
                      src="/images/placeholder-image.png"
                      alt="placeholder-image"
                    />
                    <span className="font-normal text-[14px] pt-2">
                      Please provide only front image for <br /> each product
                    </span>
                    <div className="image_upload_btn">
                      <MdFileUpload color="#fff" size={19} />
                      <label htmlFor="file-input" className="cursor-pointer">
                        Add Product image
                      </label>
                      <input
                        id="file-input"
                        placeholder="Add product image"
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* search section end */}
      {/* Product details section start */}
      {isAddProduct && (
        <div className="product_details_main">
          <div className="selected_img_parent">
            <img src={file} alt="selected_img" className="selected_img" />
            <div className="more_img_btn cursor-pointer">
              <FaPlus size={16} color="#0132c5" />
            </div>
            <span className="add_product_text font-medium text-[15px] cursor-pointer">
              Add Product
            </span>
          </div>
          <br />

          <form action="" className="add_details_section">
            <div className="details_left_section">
              <span className="add_product_details_text text-[17px] font-medium pt-6">
                Add Product Details
              </span>
              <div className="copy_details_section">
                <input
                  id="copy_details"
                  name="copy_details"
                  type="checkbox"
                  className="cursor-pointer accent-[#3a62db] size-4"
                />
                <label
                  htmlFor="copy_details"
                  className="font-light text-[14px] leading-[20px]"
                >
                  Copy input details to all products.
                  <br />
                  If you want to change specific fields for particular product
                  like Color, Fabric etc, you can change it by selecting that
                  product.
                </label>
              </div>
              <span className="text-[15px] font-normal pt-4">
                Product, Size and Inventory
              </span>
              <div className="product_details_input_container mt-8">
                <div className="w-[100%] flex justify-between gap-6 flex-wrap">
                  <div className="flex items-start gap-2">
                    <label htmlFor="weight">
                      Net Weight <br /> (gms)
                      <span className="text-red-600">&nbsp;*</span>
                    </label>
                    <input
                      id="weight"
                      name="weight"
                      title="weight"
                      type="number"
                      required={true}
                      placeholder="Enter Net weight (gms)"
                      className="w-[200px] p-4 text-[13px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="SC/P_id">
                      Style code/
                      <br />
                      Product ID
                    </label>
                    <input
                      id="SC/P_id"
                      name="SC/P_id"
                      title="SC/P_id"
                      type="number"
                      placeholder="Enter Style code/ Product ID"
                      className="w-[200px] p-4 text-[13px]"
                    />
                  </div>
                </div>
                <div className="w-[100%] flex justify-between gap-6 flex-wrap mt-4">
                  <div className="flex gap-2">
                    <label htmlFor="p_name">
                      Product <br />
                      Name{" "}
                      <span className="text-red-600">
                        &nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                    </label>
                    <input
                      id="p_name"
                      name="p_name"
                      title="p_name"
                      type="text"
                      required={true}
                      placeholder="Enter Product name"
                      className="w-[200px] p-4 text-[13px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="size">
                      Size
                      <span className="text-red-600">
                        &nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                    </label>
                    <input
                      id="size"
                      name="size"
                      title="size"
                      type="number"
                      placeholder="Enter size of product"
                      className="w-[200px] p-4 text-[13px]"
                    />
                  </div>
                </div>
              </div>
              <span className="text-[15px] font-normal pt-4">
                Product details
              </span>
              <div className="product_details_input_container mt-8">
                <div className="w-[100%] flex justify-between gap-6 flex-wrap">
                  <div className="flex items-start gap-2">
                    <label htmlFor="color">
                      Color
                      <span className="text-red-600">
                        &nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                    </label>
                    <input
                      id="color"
                      name="color"
                      title="color"
                      type="text"
                      required={true}
                      placeholder="Product color"
                      className="w-[200px] p-4 text-[13px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="material">
                      Material
                      <span className="text-red-600">&nbsp;*</span>
                    </label>
                    <input
                      id="material"
                      name="material"
                      title="material"
                      type="text"
                      required={true}
                      placeholder="Material type"
                      className="w-[200px] p-4 text-[13px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="details_right_section ">
              <div className="follow_guideline_box">
                <FaCircleExclamation size={17} color="#ddd604" />
                <span className="text-[14px] text-nowrap">
                  Follow guidelines to reduce quality failure
                </span>
              </div>
              <div className="guideline_text_link_container mt-[18px] px-2">
                <span className="text-[14px] font-medium">
                  Image Guidelines
                </span>
                <span className="font-medium text-[14px] text-[#0132c5] cursor-pointer">
                  View full image guidelines
                </span>
              </div>
              <div className="guidelines_text mt-4 font-normal text-[14px] text-gray-500">
                <span className="flex justify-center items-baseline gap-2">
                  <div className="guideline_number">1</div>
                  Images with text/watermark are not acceptable in primary
                  images.
                </span>
                <span className="flex justify-center items-baseline gap-2">
                  <div className="guideline_number">2</div>
                  Product image must not have any text.
                </span>
                <span className="flex justify-center items-baseline gap-2">
                  <div className="guideline_number">3</div>
                  Please add solo product image without any props.
                </span>
              </div>
            </div>
            <div className="form_btns_container">
              <div className="discard_btn_container">
                <button type="reset" className="discard_btn">
                  Discard Catalog
                </button>
              </div>
              <div className="save_go_back_and_save_btn_container">
                <button className="save_and_go_back_btn">
                  Save and Go back
                </button>
                <div className="save_btn" onClick={handleSave}>
                  Save
                </div>
              </div>
            </div>
          </form>
          {isLoading && (
            <div className="loading_screen">
              <div className="loading_overlay"></div>
              <div className="loading_card">
                <span className="loader"></span>
                <span className="laoding_text">
                  Please wait... We are listing your product
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Product details section end */}
    </div>
  );
};

export default SingleCatalog;
