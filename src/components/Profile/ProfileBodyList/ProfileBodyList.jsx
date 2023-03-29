import React from "react";
import styles from './ProfileBodyList.module.css';

const ProfileBodyList = ({textAreasTitles, fieldName, textAreas}) => {

  return (
      <div className={styles.body_title}>
        <h3>{textAreasTitles[fieldName]}</h3>
        <div>{textAreas[fieldName]}</div>
      </div>
  );
};
export default ProfileBodyList;
