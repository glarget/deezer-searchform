import React from "react";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import PropTypes from "prop-types";

import styles from "./SearchInput.module.scss";

const SearchInput = ({ onChange }) => {
  return (
    <div className={styles.SearchInput} data-testid="searchInput">
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <span className={styles.logo}>
            <SearchSvg data-testid="logo" />
          </span>
          <input
            placeholder="Rechercher votre artiste ou album..."
            className={styles.input}
            type="text"
            onChange={onChange}
            data-testid="input"
          />
        </div>
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func
};

export default SearchInput;
