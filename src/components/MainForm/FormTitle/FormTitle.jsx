import React from "react";
import styles from "./FormTitle.module.css";

class FormTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <h1 className={styles.form_title}>
          {this.props.title}
        </h1>
    );
  };
}


export default FormTitle;
