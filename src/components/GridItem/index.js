import React from "react";
import PropTypes from "prop-types";
import styles from "./GridItem.module.scss";

const GridItem = ({ id, album, title, link, rank, cover_small }) => {
  const { title: titleAlbum, cover_small: coverSmallAlbum, tracklist } = album;

  return (
    <>
      <div className={styles.GridItem} data-testid="gridItem">
        <div className={styles.rank} data-testid="rank">
          {rank}
        </div>
      </div>
      <div className={styles.GridItem} data-testid="gridItem">
        <div className={styles.id} data-testid="id">
          {id}
        </div>
      </div>
      <div className={styles.GridItem} data-testid="gridItem">
        <div className={styles.title} data-testid="title">
          {title}
        </div>
      </div>

      <div className={styles.GridItem} data-testid="gridItem">
        <span className={styles.titleAlbum} data-testid="titleAlbum">
          {titleAlbum ? titleAlbum : title}
        </span>
        <a
          href={link ? link : tracklist}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link"
        >
          <img
            alt={title}
            src={cover_small ? cover_small : coverSmallAlbum}
            data-testid="img"
          />
        </a>
      </div>
    </>
  );
};

GridItem.defaultProps = {
  album: {}
};

GridItem.propTypes = {
  id: PropTypes.number,
  album: PropTypes.object,
  title: PropTypes.string,
  link: PropTypes.string,
  rank: PropTypes.number,
  cover_small: PropTypes.string,
  tracklist: PropTypes.string
};

export default GridItem;
