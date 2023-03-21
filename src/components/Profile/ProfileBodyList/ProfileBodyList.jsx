import React from "react";
import styles from './ProfileBodyList.module.css';

class ProfileBodyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {textAreasTitles, fieldName, textAreas} = this.props;
    return (
        <div className={styles.body_title}>
          <h3>{textAreasTitles[fieldName]}</h3>
          <div>{textAreas[fieldName]}</div>
        </div>
    );
  };
}

export default ProfileBodyList;
