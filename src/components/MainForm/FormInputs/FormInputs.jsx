import React from "react";
import styles from './FormInputs.module.css';

class FormInputs extends React.Component {
  constructor(props) {
    super(props);
    this.formSectionName = 'inputs';
    this.state = {};
  }

  render() {
    const {inputsData, stateValues, updateStateValues} = this.props;
    return (
        <div className={styles.inputs}>
          {inputsData.map(data =>
              <div key={data.inputId}>
                <label htmlFor={data.inputId}>{data.labelTitle}</label>
                <input type={data.inputType}
                       name={data.inputId}
                       id={data.inputId}
                       placeholder={data.inputPlaceholder}
                       value={stateValues[this.formSectionName][data.inputId]}
                       onChange={event =>
                           updateStateValues(this.formSectionName, data.inputId, event.target.value)}
                       required/>
              </div>
          )}
        </div>
    );
  };
}

export default FormInputs;
