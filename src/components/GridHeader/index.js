import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as ChevronDownSvg } from "../../assets/icons/chevronDown.svg";
import { ReactComponent as ChevronUpSvg } from "../../assets/icons/chevronUp.svg";
import Select from "react-select";

import styles from "./GridHeader.module.scss";

const options = [{ value: "album", label: "album" }];

class GridHeader extends Component {
  state = {
    selectedOption: null
  };

  handleChange = ({ value }) => {
    this.props.onFilterChange && this.props.onFilterChange(value);
  };

  handleClickSort = type => () => {
    this.props.onClickSort && this.props.onClickSort(type);
  };

  render() {
    const { ascendentId, ascendentRank } = this.props;
    const { selectedOption } = this.state;

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.selectProps.menuColor
      })
    };

    return (
      <>
        <div className={styles.header} data-test-id="header">
          <div>
            <span>Ranking</span>
            <span
              className={styles.pictoFilter}
              onClick={this.handleClickSort("rank")}
            >
              {ascendentRank ? (
                <ChevronDownSvg data-test-id="chevronDownSvg" />
              ) : (
                <ChevronUpSvg data-test-id="chevronUpSvg" />
              )}
            </span>
          </div>
          <div>
            <span>ID</span>
            <span
              className={styles.pictoFilter}
              onClick={this.handleClickSort("id")}
            >
              {ascendentId ? (
                <ChevronDownSvg data-test-id="chevronDownSvg" />
              ) : (
                <ChevronUpSvg data-test-id="chevronUpSvg" />
              )}
            </span>
          </div>
          <div>
            <span>Titre</span>
          </div>
          <div>Album</div>
        </div>
        <div className={styles.filterWrapper}>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            placeholder="tri"
            styles={customStyles}
            menuColor="green"
            data-test-id="selector"
          />
        </div>
      </>
    );
  }
}

GridHeader.propTypes = {
  onFilterChange: PropTypes.func,
  onClickSort: PropTypes.func,
  ascendentId: PropTypes.bool,
  ascendentRank: PropTypes.bool
};

export default GridHeader;
