import React from "react";
import styles from './FormTextAreas.module.css';
import ErrorSection from "../ErrorSection/ErrorSection";

class FormTextAreas extends React.Component {
  constructor(props) {
    super(props);

    this.formSectionName = 'textAreas';
    this.state = {
      charCounter: {about: 0, technology: 0, lastProject: 0,},
      focusElem: {about: false, technology: false, lastProject: false,}
    };
  };

  handleOnChange = (event, textAreasName) => {
    this.props.updateStateValues(this.formSectionName, textAreasName, event.target.value);
    this.setState({
      ...this.state,
      charCounter: {...this.state.charCounter, [textAreasName]: event.target.value.length,}
    });
  };

  render() {
    const {textAreasData, stateValues} = this.props;
    const {charCounter, focusElem} = this.state;
    return (
        <div className={styles.text_areas}>
          {textAreasData.map(({labelTitle, areaRows, maxLength, textAreasId}) =>
              <div key={textAreasId}>
                <label htmlFor={textAreasId}>{labelTitle}</label>
                <textarea rows={areaRows}
                          name={textAreasId}
                          id={textAreasId}
                          value={stateValues[this.formSectionName][textAreasId]}
                          onChange={event => this.handleOnChange(event, textAreasId)}
                          onFocus={() => this.setState({
                            ...this.state, focusElem: {...focusElem, [textAreasId]: true,}
                          })}
                          onBlur={() => this.setState({
                            ...this.state, focusElem: {...focusElem, [textAreasId]: false,}
                          })}>
                </textarea>
                {focusElem[textAreasId] && !stateValues.formErrors[this.formSectionName][textAreasId] && (
                    <p>Осталось&nbsp;
                      {stateValues[this.formSectionName][textAreasId] !== ''
                          ? maxLength - charCounter[textAreasId]
                          : maxLength}/{maxLength}
                      &nbsp;символов</p>)}
                {stateValues.formErrors[this.formSectionName][textAreasId]
                    && <ErrorSection
                        errorCause={stateValues[this.formSectionName][textAreasId].trim() === '' ? 'empty' : 'limit'}/>}
              </div>
          )}
        </div>
    );
  };
}

export default FormTextAreas;
