import React, { useState } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import styles from "./Add.module.css";
import ButtonPrimary from "./misc/ButtonPrimary";
import ApiResponseMessage from "./ApiResponseMessage";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import AddSVG from "../public/assets/SVGs/AddSVG";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red; // Customize the color of the loading bar
`;

const Add = () => {
  const scrollAnimation = getScrollAnimation();
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // State to hold the form data
  const [formData, setFormData] = useState({
    bhk: "",
    price: "",
    area: "",
    society: "",
    address: "",
    floor: "",
    available: false,
  });

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Add validation for BHK, Price, and Area inputs to prevent negative values
    if (name === "bhk" || name === "price" || name === "area") {
      const numericValue = parseInt(value);
      const validValue = !isNaN(numericValue) ? Math.max(0, numericValue) : 0;

      setFormData((prevData) => ({
        ...prevData,
        [name]: validValue,
      }));
    } else if (name === "floor") {
      const numericValue = parseInt(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? e.target.checked : value,
      }));
    }
  };

  const isFormEmpty =
    formData.bhk === "" &&
    formData.price === "" &&
    formData.area === "" &&
    formData.society === "" &&
    formData.address === "" &&
    formData.floor === "";

  const resetForm = () => {
    setFormData({
      bhk: "",
      price: "",
      area: "",
      society: "",
      address: "",
      floor: "",
      available: false,
    });
  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Handler for form submission
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      bhk: formData.bhk,
      price: formData.price,
      area: formData.area,
      society: formData.society,
      address: formData.address,
      floor: formData.floor,
      available: formData.available,
    };
    console.log(JSON.stringify(body));

    try {
      const response = await fetch("/api/controller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.status !== 200) {
        setIsFormSubmitted(false);
        setApiResponse({ status: "error", message: data.error });
      } else {
        resetForm();
        setIsFormSubmitted(true);
        setApiResponse({
          status: "success",
          message: "Form submitted successfully!",
        });
      }
    } catch (error) {
      setIsFormSubmitted(false);
      setApiResponse({
        status: "error",
        message: "There was an error submitting",
      });
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="add">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}
        >
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className={`form-group ${styles["form-group"]}`}>
                <label htmlFor="bhk">BHK*:</label>
                <input
                  type="number"
                  name="bhk"
                  value={formData.bhk}
                  onChange={handleChange}
                  required
                  className={`form-input ${styles["form-input"]}`}
                />
              </div>
              <div className={`form-group ${styles["form-group"]}`}>
                <label htmlFor="price">Price*:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className={`form-input ${styles["form-input"]}`}
                />
              </div>
              <div className={`form-group ${styles["form-group"]}`}>
                <label htmlFor="area">Area*:</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className={`form-input ${styles["form-input"]}`}
                />
              </div>
              <div className={`form-group ${styles["form-group"]}`}>
                <label htmlFor="society">Society:</label>
                <input
                  type="text"
                  name="society"
                  value={formData.society}
                  onChange={handleChange}
                  className={`form-input ${styles["form-input"]}`}
                />
              </div>
              <div className={`form-group ${styles["form-group"]}`}>
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`form-input ${styles["form-input"]}`}
                />
              </div>
              <div className={`form-group ${styles["form-group"]}`}>
                <label htmlFor="floor">Floor*:</label>
                <input
                  type="number"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  required
                  className={`form-input ${styles["form-input"]}`}
                />
              </div>
              <div className={`form-group ${styles["form-group"]}`}>
                <div className={`form-checkbox ${styles["form-checkbox"]}`}>
                  <label className="checkbox-text" htmlFor="available">
                    Available*
                  </label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                </div>
              </div>

              <ButtonPrimary type="submit" className="form-button">
                Add
              </ButtonPrimary>
            </form>
          </div>
          <div className="flex w-full">
            <motion.div variants={scrollAnimation}>
              {apiResponse && (
                <ApiResponseMessage
                  status={apiResponse.status}
                  message={apiResponse.message}
                />
              )}
              {isFormEmpty && !isFormSubmitted && (
                <div className="pointing-hand-container">
                  {/* Add your SVG pointing hand or any other content here */}
                  <AddSVG/>
                  <p className="text-center">
                    Fill the form and check the response
                  </p>
                </div>
              )}
              <div className="flex justify-center mt-4">
                <BarLoader color={"#123abc"} loading={isLoading} css={override} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Add;
