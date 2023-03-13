import React from "react";
import styles from './FormInputs.module.css';

class FormInputs extends React.Component {
  constructor(props) {
    super(props);
    this.formSectionName = 'inputs';
    this.state = {};
  }

  render() {
    return (
        <div className={styles.inputs}>
          {this.props.inputsData.map(data =>
              <div key={data.inputId}>
                <label htmlFor={data.inputId}>{data.labelTitle}</label>
                <input type={data.inputType}
                       name={data.inputId}
                       id={data.inputId}
                       placeholder={data.inputPlaceholder}
                       value={this.props.stateValues[this.formSectionName][data.inputId]}
                       onChange={event =>
                           this.props.updateStateValues(this.formSectionName, data.inputId, event.target.value)}
                       required/>
              </div>
          )}
        </div>
    );
  };
}

export default FormInputs;
