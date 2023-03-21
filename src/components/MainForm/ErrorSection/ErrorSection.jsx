import React from "react";
import styles from './ErrorSection.module.css';

class ErrorSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.errorMessage = {
      empty: 'Поле пустое. Заполните пожалуйста',
      invalid: 'Введен неверный формат данных',
      limit: 'Превышен лимит символов в поле',
    };
  }

  render() {
    const {errorCause} = this.props;
    return (
        <div className={styles.error_message}>
          {this.errorMessage[errorCause]}
        </div>
    );
  }
}

export default ErrorSection;
