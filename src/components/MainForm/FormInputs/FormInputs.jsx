import React, {useState} from "react";
import styles from './FormInputs.module.css';
import InputNote from "./InputNote/InputNote";
import ErrorSection from "../ErrorSection/ErrorSection";

const TODAY_DATE = new Date().toISOString().split("T")[0];
const EARLIEST_DATE = '1900-01-01';

const FormInputs = ({updateStateValues, inputsData, stateValues}) => {
  const formSectionName = 'inputs';
  const [focusElem, setFocusElem] = useState({
    firstName: false,
    lastName: false,
    birthday: false,
    phoneNumber: false,
    url: false,
  },);


  const handleTelChange = (event, inputName) => {
    const input = event.target;
    const getInputNumbersValues = (input) => input.value.replace(/\D/g, '');
    const inputNumbersValue = getInputNumbersValues(input);
    let formattedInputValue = '';

    if (!inputNumbersValue) updateStateValues(formSectionName, inputName, '');
    if (inputNumbersValue.length > 0) formattedInputValue = inputNumbersValue[0];
    if (inputNumbersValue.length > 1) formattedInputValue += '-' + inputNumbersValue.substring(1, 5);
    if (inputNumbersValue.length > 5) formattedInputValue += '-' + inputNumbersValue.substring(5, 7);
    if (inputNumbersValue.length > 7) formattedInputValue += '-' + inputNumbersValue.substring(7, 9);

    updateStateValues(formSectionName, inputName, formattedInputValue);
  };

  const handleOnChange = (event, inputName) => updateStateValues(formSectionName, inputName, event.target.value);

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
                     value={stateValues[formSectionName][inputId]}
                     min={inputType === 'date' ? `${EARLIEST_DATE}` : null}
                     max={inputType === 'date' ? `${TODAY_DATE}` : null}
                     maxLength={inputType === 'tel' ? 12 : null}
                     onChange={inputType === 'tel' ? (e) => handleTelChange(e, inputId) : (e) => handleOnChange(e, inputId)}
                     aria-invalid={!stateValues.formValidation[formSectionName][inputId]}
                     aria-describedby={`input_note_${inputId}`}
                     onFocus={() => setFocusElem({...focusElem, [inputId]: true})}
                     onBlur={() => setFocusElem({...focusElem, [inputId]: false})}
              />
              {focusElem[inputId]
                  && !stateValues.formValidation[formSectionName][inputId]
                  && <InputNote id={`input_note_${inputId}`} inputId={inputId}/>}
              {!focusElem[inputId]
                  && stateValues.formErrors[formSectionName][inputId]
                  && <ErrorSection
                      errorCause={stateValues[formSectionName][inputId].trim() === '' ? 'empty' : 'invalid'}/>}
            </div>
        )}
      </div>
  );
}

export default FormInputs;
