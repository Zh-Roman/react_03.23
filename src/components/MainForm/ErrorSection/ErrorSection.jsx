import React from "react";
import styles from './ErrorSection.module.css';

const ErrorSection = ({errorCause}) => {
  const errorMessage = {
    empty: 'Поле пустое. Заполните пожалуйста',
    invalid: 'Введен неверный формат данных',
    limit: 'Превышен лимит символов в поле',
  };

  return (
      <div className={styles.error_message}>
        {errorMessage[errorCause]}
      </div>
  );
};

export default ErrorSection;
