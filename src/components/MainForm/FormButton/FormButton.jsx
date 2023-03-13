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
    return (
        <button onClick={this.props.resetForm ? this.handleClick : null}
                className={styles.button}
                type={this.props.buttonsData.buttonType}>
          {this.props.buttonsData.buttonPurpose}
        </button>
    );
  };
}

export default FormButton;
