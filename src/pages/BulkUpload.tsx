/* default imports */
import React from "react";
import { useState } from "react";
import "./BulkUpload.css";
import { Link } from "react-router-dom";
/* icons */
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
import { AiFillPlusCircle } from "react-icons/ai";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoIosRemoveCircle } from "react-icons/io";
import { BsFillCheckCircleFill } from "react-icons/bs";
/* components */
/* interfaces */
interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  s3Link: string;
}

const BulkUpload: React.FC = () => {
  // states
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // useffects

  // functions
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        s3Link: `https://s3.amazonaws.com/your-bucket-name/${generateRandomString(
          16
        )}`, // Simulating S3 link
      }));
      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleGetLink = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
    }, 3000);
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy the link: ", error);
      });
  };

  const generateRandomString = (length: number): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };
  return (
    <div className="bulk_upload_main_container">
      {/* sidebar section start */}
      <div className="sidebar_parent2">
        {/* profile section start */}
        <div className="profile_container2 relative">
          <div className="profile_image_container2 cursor-pointer">
            <GiShop size={26} color="#bababa" />
          </div>
          <span className="profile_name2 font-semibold text-[19px]">
            Mart2cart-
          </span>
          <div className="user_options_btn2 absolute right-6">
            <FaChevronDown className="cursor-pointer" />
          </div>
          <hr className="sepration_line2 absolute -bottom-4 left-0 w-[100%]" />
        </div>
        {/* profile section end */}
        {/* notice and support section start */}
        <div className="notice_support_container2 relative">
          <div className="notice_container2 text-[16px] font-normal cursor-pointer">
            <FaBell className="notification_icon2 relative" />
            Notices (6)
          </div>
          <div className="support_container2 text-[16px] font-normal cursor-pointer">
            <MdSupportAgent size={23} />
            Support
          </div>
          <hr className="sepration_line2 absolute -bottom-3 left-0 w-[100%]" />
        </div>
        {/* notice and support section end */}
        {/* sidebar options section start */}
        <div className="sidebar_options2">
          <div className="individual_option_container2">
            <GiShop size={22} />
            <span className="option_name2 text-[16px] font-normal">Home</span>
          </div>
          <div className="individual_option_container2">
            <GiShoppingBag size={22} />
            <span className="option_name2 text-[16px] font-normal">Orders</span>
          </div>
          <div className="individual_option_container2">
            <IoArrowUndo size={22} />
            <span className="option_name2 text-[16px] font-normal">
              Returns
            </span>
          </div>
          <div className="individual_option_container2">
            <HiMiniSquares2X2 size={22} />
            <span className="option_name2 text-[16px] font-normal">
              Inventory
            </span>
          </div>
          <div className="individual_option_container2">
            <FaRegCreditCard size={22} />
            <span className="option_name2 text-[16px] font-normal">
              Payments
            </span>
          </div>
          <Link
            to={"/catalog"}
            className="individual_option_container2 text-white"
          >
            <ImFolderUpload size={22} />
            <span className="option_name2 text-[16px] font-normal">
              Catalog Upload
            </span>
          </Link>

          <Link
            to={"/bulk-upload"}
            className="individual_option_container2 text-white"
          >
            <FaImages size={22} />
            <span className="option_name2 text-[16px] font-normal">
              Image Bulk Upload
            </span>
          </Link>
        </div>
        {/* sidebar options section end */}
      </div>
      {/* sidebar section end */}
      {/* bulk upload content section start */}
      <div className="bulk_upload_content_section">
        <div className="flex justify-start items-center gap-3">
          <IoChevronBackSharp
            className="back_icon"
            size={20}
            onClick={() => {
              window.history.back();
            }}
          />
          <span className="bulk_upload_text">Image Bulk Upload</span>
        </div>
        <div className="add_images_btn_container">
          <label htmlFor="multi_image_upload">
            <AiFillPlusCircle
              size={26}
              color="#0132c5"
              className="cursor-pointer"
            />
          </label>
          <input
            id="multi_image_upload"
            name="multi_image_upload"
            title="multi_image_upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="files_input"
          />
          <span className="add_image_text">Add Images</span>
          <span className="text-gray-500">You can add images here</span>
        </div>
        {uploadedImages.length > 0 && (
          <div className="bg-white px-2 py-3 mt-4">
            <div className="">
              <div className="images_preview_section">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <div
                      className="remove_image_icon bg-white"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <IoIosRemoveCircle size={20} />
                    </div>
                    <img
                      src={image.preview}
                      alt={`Upload preview ${index + 1}`}
                      className="preview_image"
                      loading="lazy"
                    />
                    <div className="image_ok_icon bg-white">
                      <BsFillCheckCircleFill size={18} color="#05a105" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="upload_btn_container">
              <button
                type="button"
                className="get_link_btn"
                onClick={handleGetLink}
              >
                Get Image Link
              </button>
            </div>
          </div>
        )}
        {isUploaded && (
          <div className="image_links_container bg-white mt-4">
            <span className="text-[16px] font-medium">Image Links</span>
            <table className="image_links_table w-[100%] mt-6">
              <thead>
                <tr>
                  <th className="text-left">Image</th>
                  <th className="text-left">Title</th>
                  <th className="text-left">Link</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedImages.map((images, index) => (
                  <tr key={index}>
                    <td className="table_image p-2">
                      <img
                        src={images.preview}
                        title="preview_image"
                        alt="preview_image"
                        className="w-[70px] h-[70px]"
                      />
                    </td>
                    <td className="text_title">Product 1 title</td>
                    <td className="text_link text-wrap">{images.s3Link}</td>
                    <td className="action_btns_container p-2">
                      <button
                        className="action_btn copy_btn"
                        onClick={() => handleCopyLink(images.s3Link)}
                      >
                        Copy Link
                      </button>
                      <button className="action_btn remove_btn">
                        Remove Image
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* bulk upload content section end */}
      {isUploading && (
        <div className="loading_screen">
          <div className="loading_overlay_2"></div>
          <div className="loading_card">
            <span className="loader"></span>
            <span className="laoding_text">
              Please wait... Uploading Images
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;
