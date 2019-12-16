import React from "react";
import styles from "./ErrorMessage.module.scss";
import PropTypes from "prop-types";

const ErrorMessage = ({ error }) => (
  <div className={styles.ErrorContainer}>
    <p>Une erreur est survenue : {error}</p>
    <p>Veuillez renouveller votre rechercher ultérieuement.</p>
  </div>
);

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired
};

export default ErrorMessage;
