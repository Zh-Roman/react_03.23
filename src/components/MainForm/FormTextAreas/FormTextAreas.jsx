import React, {useState} from "react";
import styles from './FormTextAreas.module.css';
import ErrorSection from "../ErrorSection/ErrorSection";

const FormTextAreas = ({updateStateValues, textAreasData, stateValues}) => {
  const formSectionName = 'textAreas';
  const [charCounter, setCharCounter] = useState({about: 0, technology: 0, lastProject: 0,});
  const [focusElem, setFocusElem] = useState({about: false, technology: false, lastProject: false,});

  const handleOnChange = (event, textAreasName) => {
    updateStateValues(formSectionName, textAreasName, event.target.value);
    setCharCounter({...charCounter, [textAreasName]: event.target.value.length,});
  };

  return (
      <div className={styles.text_areas}>
        {textAreasData.map(({labelTitle, areaRows, maxLength, textAreasId}) =>
            <div key={textAreasId}>
              <label htmlFor={textAreasId}>{labelTitle}</label>
              <textarea rows={areaRows}
                        name={textAreasId}
                        id={textAreasId}
                        value={stateValues[formSectionName][textAreasId]}
                        onChange={event => handleOnChange(event, textAreasId)}
                        onFocus={() => setFocusElem({...focusElem, [textAreasId]: true,})}
                        onBlur={() => setFocusElem({...focusElem, [textAreasId]: false,})}>
                </textarea>
              {focusElem[textAreasId] && !stateValues.formErrors[formSectionName][textAreasId] && (
                  <p>Осталось&nbsp;
                    {stateValues[formSectionName][textAreasId] !== ''
                        ? maxLength - charCounter[textAreasId]
                        : maxLength}/{maxLength}
                    &nbsp;символов</p>)}
              {stateValues.formErrors[formSectionName][textAreasId]
                  && <ErrorSection
                      errorCause={stateValues[formSectionName][textAreasId].trim() === '' ? 'empty' : 'limit'}/>}
            </div>
        )}
      </div>
  );
};

export default FormTextAreas;
