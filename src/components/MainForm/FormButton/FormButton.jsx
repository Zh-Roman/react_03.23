import React from "react";
import styles from './FormButton.module.css';

class FormButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

  handleClick = () => {
    this.props.resetForm();
  };

  render() {
    const {resetForm, buttonsData: {buttonType, buttonPurpose}} = this.props;
    return (
        <button onClick={resetForm ? this.handleClick : null}
                className={styles.button}
                type={buttonType}>
          {buttonPurpose}
        </button>
    );
  };
}

export default FormButton;
