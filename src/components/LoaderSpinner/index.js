import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styles from "./LoaderSpinner.module.scss";

const LoaderSpinner = () => (
  <div className={styles.LoaderSpinner}>
    <Loader type="ThreeDots" color="#5dc189" height={150} width={150} />
  </div>
);

export default LoaderSpinner;
