import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import styles from "./Add.module.css";
import ButtonPrimary from "./misc/ButtonPrimary";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import SearchSVG from "../public/assets/SVGs/SearchSVG";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red; // Customize the color of the loading bar
`;



const Get = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    id:'',
    bhk: '',
    price: '',
    area: '',
    society: '',
    address: '',
    floor: '',
    available: '',
  });
  const [searchResults, setSearchResults] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setSearchCriteria((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name === 'bhk' || name === 'price' || name === 'area' || name === 'id') {
      // Add validation for BHK, Price, and Area inputs to prevent negative values
      const numericValue = parseInt(value);
      const validValue = !isNaN(numericValue) ? Math.max(0, numericValue) : '';
  
      setSearchCriteria((prevData) => ({
        ...prevData,
        [name]: validValue,
      }));
    } else if (name === 'floor') {
      // Handle floor input separately to allow negative or zero values
      const numericValue = parseInt(value);
      const validValue = !isNaN(numericValue) ? numericValue : '';
  
      setSearchCriteria((prevData) => ({
        ...prevData,
        [name]: validValue,
      }));
    } else {
      setSearchCriteria((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Convert searchCriteria object into a query string
      const queryString = Object.keys(searchCriteria)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(searchCriteria[key]))
        .join('&');
        console.log(queryString);
  
      // Make the API request to '/api/controller' with the search criteria
      const response = await fetch(`/api/controller?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        // Handle error response here
        console.log('Error occurred while fetching data.');
        setSearchResults(null);
        return;
      }
  
      // Parse the API response
      const data = await response.json();
      console.log(data);
  
      // Update the state with the search results
      setSearchResults(data);
    } catch (error) {
      console.log('Error occurred while fetching data.', error);
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="get"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <div className="h-full w-full p-4">
          <form onSubmit={handleSubmit}>
          <div className={`form-group ${styles["form-group"]}`}>
                <label htmlFor="id">ID:</label>
                <input
                  type="number"
                  name="id"
                  value={searchCriteria.id}
                  onChange={handleChange}
                  className={`form-input ${styles["form-input"]}`}
                />
              </div>
          <div className={`form-group ${styles["form-group"]}`}>
                <label htmlFor="bhk">BHK:</label>
                <input
                  type="number"
                  name="bhk"
                  value={searchCriteria.bhk}
                  onChange={handleChange}
                  className={`form-input ${styles["form-input"]}`}
                />
              </div>
            <div className={`form-group ${styles["form-group"]}`}>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                value={searchCriteria.price}
                onChange={handleChange}
                className={`form-input ${styles["form-input"]}`}
              />
            </div>
            <div className={`form-group ${styles["form-group"]}`}>
              <label htmlFor="area">Area:</label>
              <input
                type="number"
                name="area"
                value={searchCriteria.area}
                onChange={handleChange}
                className={`form-input ${styles["form-input"]}`}
              />
            </div>
            <div className={`form-group ${styles["form-group"]}`}>
              <label htmlFor="society">Society:</label>
              <input
                type="text"
                name="society"
                value={searchCriteria.society}
                onChange={handleChange}
                className={`form-input ${styles["form-input"]}`}
              />
            </div>
            <div className={`form-group ${styles["form-group"]}`}>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                value={searchCriteria.address}
                onChange={handleChange}
                className={`form-input ${styles["form-input"]}`}
              />
            </div>
            <div className={`form-group ${styles["form-group"]}`}>
              <label htmlFor="floor">Floor:</label>
              <input
                type="number"
                name="floor"
                value={searchCriteria.floor}
                onChange={handleChange}
                className={`form-input ${styles["form-input"]}`}
              />
            </div>
            <div className={`form-group ${styles["form-group"]}`}>
            <div className={`form-checkbox ${styles["form-checkbox"]}`}>
              <label className="checkbox-text" htmlFor="available">
                Available 
              </label>
              <input
                type="checkbox"
                name="available"
                checked={searchCriteria.available}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
            </div>
          </div>


          <div className="flex justify-center">
            <ButtonPrimary type="submit" className="form-button">
              Search
            </ButtonPrimary>
            </div>
      </form>
          </div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper className="flex w-full justify-end">
        <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
  {searchResults && searchResults.estates.length > 0 ? (
    <div className="search-results-container" style={{height: '500px', overflow: 'auto' ,border: '1px solid #ccc',padding: '16px' ,fontFamily: "Courier New, monospace", background: "#f7fafc"}}>
      {searchResults.estates.map((estate, index, array) => (
        <motion.div key={estate.id} className="search-result-item border-gray-300 py-4" whileTap={{ scale: 1.1, cursor: "pointer" }} >
          {/* Render the estate details here */}
          <p><strong>ID:</strong> {estate.id}</p>
          <p><strong>BHK:</strong> {estate.bhk}</p>
          <p><strong>Price:</strong> {estate.price}</p>
          <p><strong>Area:</strong> {estate.area}</p>
          <p><strong>Society:</strong> {estate.society}</p>
          <p><strong>Address:</strong> {estate.address}</p>
          <p><strong>Floor:</strong> {estate.floor}</p>
          <p><strong>Available:</strong> {estate.available ? 'Yes' : 'No'}</p>
          {/* Classy Divider */}
          {index !== searchResults.estates.length - 1 && (
                        <div
                          style={{
                            width: "100%",
                            height: "1px",
                            background: "#e2e8f0",
                            margin: "8px 0",
                          }}
                        />
                      )}
        </motion.div>
      ))}
    </div>
  ) : (

      <div style={{ width: '50%', margin: '0 auto', textAlign: 'center', fontFamily: 'helvetica, arial, sans-serif' }}>
       
        <a>
          <SearchSVG/>
        </a>
        <p>
          Search for any field or keep the form blank to get the whole detail
        </p>
      </div>
    )}
    <div className="flex justify-center mt-4">
                <BarLoader color={"#123abc"} loading={isLoading} css={override} />
              </div>
  </motion.div>
</ScrollAnimationWrapper>


      </div>
    </div>
  );
};

export default Get;
