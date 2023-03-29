import React from "react";
import styles from './FormButton.module.css';

const FormButton = ({resetForm, buttonsData: {buttonType, buttonPurpose}, validForm}) => {
  const handleCLick = () => {
    if (resetForm) resetForm();
  };

  return (
      <button
          onClick={handleCLick}
          className={validForm ? `${styles.button} ${styles.active}` : styles.button}
          type={buttonType}>
        {buttonPurpose}
      </button>
  );
}

export default FormButton;
