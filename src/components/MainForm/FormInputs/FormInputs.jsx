import React from "react";
import styles from './FormInputs.module.css';
import InputNote from "./InputNote/InputNote";
import ErrorSection from "../ErrorSection/ErrorSection";

const TODAY_DATE = new Date().toISOString().split("T")[0];
const EARLIEST_DATE = '1900-01-01';

class FormInputs extends React.Component {
  constructor(props) {
    super(props);
    this.formSectionName = 'inputs';
    this.state = {
      focusElem: {
        firstName: false,
        lastName: false,
        birthday: false,
        phoneNumber: false,
        url: false,
      },
    };
  };

  handleTelChange(event, inputName) {
    const {updateStateValues} = this.props;
    const input = event.target;
    const getInputNumbersValues = (input) => input.value.replace(/\D/g, '');
    const inputNumbersValue = getInputNumbersValues(input);
    let formattedInputValue = '';

    if (!inputNumbersValue) updateStateValues(this.formSectionName, inputName, '');
    if (inputNumbersValue.length > 0) formattedInputValue = inputNumbersValue[0];
    if (inputNumbersValue.length > 1) formattedInputValue += '-' + inputNumbersValue.substring(1, 5);
    if (inputNumbersValue.length > 5) formattedInputValue += '-' + inputNumbersValue.substring(5, 7);
    if (inputNumbersValue.length > 7) formattedInputValue += '-' + inputNumbersValue.substring(7, 9);

    updateStateValues(this.formSectionName, inputName, formattedInputValue);
  };

  handleOnChange = (event, inputName) => {
    this.props.updateStateValues(this.formSectionName, inputName, event.target.value);
  };

  render() {
    const {inputsData, stateValues} = this.props;
    const {focusElem} = this.state;
    return (
        <div className={styles.inputs}>
          {inputsData.map(({inputId, labelTitle, inputType, inputPlaceholder}) =>
              <div key={inputId}>
                <label htmlFor={inputId}>{labelTitle}</label>
                <input type={inputType}
                       autoComplete={'off'}
                       name={inputId}
                       id={inputId}
                       placeholder={inputPlaceholder}
                       value={stateValues[this.formSectionName][inputId]}
                       min={inputType === 'date' ? `${EARLIEST_DATE}` : null}
                       max={inputType === 'date' ? `${TODAY_DATE}` : null}
                       maxLength={inputType === 'tel' ? 12 : null}
                       onChange={inputType === 'tel'
                           ? (e) => this.handleTelChange(e, inputId)
                           : (e) => this.handleOnChange(e, inputId)}
                       aria-invalid={!stateValues.formValidation[this.formSectionName][inputId]}
                       aria-describedby={`input_note_${inputId}`}
                       onFocus={() => this.setState({...this.state, focusElem: {...focusElem, [inputId]: true}})}
                       onBlur={() => this.setState({...this.state, focusElem: {...focusElem, [inputId]: false}})}
                />
                {focusElem[inputId]
                    // && stateValues[this.formSectionName][inputId]
                    && !stateValues.formValidation[this.formSectionName][inputId]
                    && <InputNote id={`input_note_${inputId}`} inputId={inputId}/>}
                {!focusElem[inputId]
                    && stateValues.formErrors[this.formSectionName][inputId]
                    && <ErrorSection
                        errorCause={stateValues[this.formSectionName][inputId].trim() === '' ? 'empty' : 'invalid'}/>}
              </div>
          )}
        </div>
    );
  };
}

export default FormInputs;
