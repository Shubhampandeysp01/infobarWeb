import React, { useState } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import styles from "./Add.module.css";
import ButtonPrimary from "./misc/ButtonPrimary";
import ApiResponseMessage from "./ApiResponseMessage";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import DeleteSVG from "../public/assets/SVGs/DeleteSVG";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red; // Customize the color of the loading bar
`;

const Delete = () => {
  const scrollAnimation = getScrollAnimation();
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // State to hold the form data
  const [formData, setFormData] = useState({
    id: "",
  });

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      id: "",
    });
  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = formData.id;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/controller?id=${id}`, {
        method: "DELETE",
      });

      if (response.status !== 200) {
        setIsFormSubmitted(false);
        const data = await response.json();
        setApiResponse({ status: "error", message: data.error || "An error occurred." });
      } else {
        resetForm();
        setIsFormSubmitted(true);
        setApiResponse({ status: "success", message: "Entry deleted successfully!" });
      }
    } catch (error) {
      setIsFormSubmitted(false);
      setApiResponse({ status: "error", message: "There was an error in deletion" });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="delete">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}
        >
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className={`form-group ${styles["form-group"]}`}>
                <label htmlFor="id">ID*:</label>
                <input
                  type="number"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  className={`form-input ${styles["form-input"]}`}
                />
              </div>

              <ButtonPrimary type="submit" className="form-button">
                Delete
              </ButtonPrimary>
            </form>
          </div>
          <div className="flex w-full">
            <motion.div variants={scrollAnimation}>
              {apiResponse && <ApiResponseMessage status={apiResponse.status} message={apiResponse.message} />}
              {!isFormSubmitted && !apiResponse && (
                <div className="pointing-hand-container">
                  {/* Add your SVG pointing hand or any other content here */}
                  <DeleteSVG/>
                  <p className="text-center">Delete the record by its ID</p>
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

export default Delete;
