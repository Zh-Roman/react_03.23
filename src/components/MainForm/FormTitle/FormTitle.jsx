import React from "react";
import styles from "./FormTitle.module.css";

const FormTitle = ({title}) => {

  return (
      <h1 className={styles.form_title}>
        {title}
      </h1>
  );
}


export default FormTitle;
