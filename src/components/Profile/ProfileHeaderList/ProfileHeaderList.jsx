import React from "react";
import styles from './ProfileHeaderList.module.css';

class ProfileHeaderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {inputsTitles, fieldName, inputs} = this.props;
    return (
        <div className={styles.top_title}>
          <h3>{`${inputsTitles[fieldName]}: `}</h3>
          <div>{inputs[fieldName]}</div>
        </div>
    );
  }
}

export default ProfileHeaderList;

