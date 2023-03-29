import React from "react";
import styles from './ProfileHeaderList.module.css';

const ProfileHeaderList = ({inputsTitles, fieldName, inputs}) => {

  return (
      <div className={styles.top_title}>
        <h3>{`${inputsTitles[fieldName]}: `}</h3>
        <div>{inputs[fieldName]}</div>
      </div>
  );
};

export default ProfileHeaderList;

