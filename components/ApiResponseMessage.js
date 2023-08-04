import React from "react";
import styles from "./ApiResponseMessage.module.css";

const ApiResponseMessage = ({ status, message }) => {
  return (
    <div className={`api-response-message ${status === "success" ? "success" : "error"}`}>
      {status === "success" ? (
        <>
          <svg className={`feather ${styles["feather"]} ${styles["success-icon"]}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <p>Success! {message}</p>
        </>
      ) : (
        <>
          <svg className={`feather feather-x-circle ${styles["feather"]} ${styles["error-icon"]}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          <p>Error! {message}</p>
        </>
      )}
    </div>
  );
};

export default ApiResponseMessage;
