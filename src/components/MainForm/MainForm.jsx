import React from "react";
import styles from './MainForm.module.css'
import FormTitle from "./FormTitle/FormTitle";
import FormInputs from "./FormInputs/FormInputs";
import FormTextAreas from "./FormTextAreas/FormTextAreas";
import FormButton from "./FormButton/FormButton";

const NAME_REGEX = /^([А-ЯЁ][а-яё]{1,19}|[A-Z][a-z]{1,19})$/;
const BIRTH_REGEX = /^(\d{4}-\d{2}-\d{2})$/;
const PHONE_REGEX = /^(\d-\d{4}-\d{2}-\d{2})$/;
const URL_REGEX = /^(https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)$/i;

class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      inputs: {firstName: '', lastName: '', birthday: '', phoneNumber: '', url: '',},
      textAreas: {about: '', technology: '', lastProject: '',},
      formValidation: {
        inputs: {firstName: false, lastName: false, birthday: false, phoneNumber: false, url: false,},
        textAreas: {about: false, technology: false, lastProject: false,},
        formValid: false,
      },
      formErrors: {
        inputs: {firstName: false, lastName: false, birthday: false, phoneNumber: false, url: false,},
        textAreas: {about: false, technology: false, lastProject: false,},
      }
    };

    this.state = this.initialState;
  };

  updateStateValues = (formSection, fieldName, fieldValue) => {
    this.setState({
      ...this.state,
      [formSection]: {
        ...this.state[formSection],
        [fieldName]: fieldValue,
      },
    }, () => this.validateField(formSection, fieldName, fieldValue));
  };
  validateField = (formSection, fieldName, fieldValue) => {
    const {formValidation} = this.state;
    const {textAreas} = this.props.formData;
    const validationValues = Object.keys(formValidation[formSection]).reduce((acc, value) => ({
      ...acc,
      [value]: formValidation[formSection][value],
    }), {});

    switch (fieldName) {
      case 'firstName':
      case 'lastName':
        validationValues[fieldName] = NAME_REGEX.test(fieldValue.trim());
        break;
      case 'birthday':
        validationValues[fieldName] = BIRTH_REGEX.test(fieldValue.trim());
        break;
      case 'phoneNumber':
        validationValues[fieldName] = PHONE_REGEX.test(fieldValue.trim());
        break;
      case 'url':
        validationValues[fieldName] = URL_REGEX.test(fieldValue.trim());
        break;
      case 'about':
      case 'technology':
      case 'lastProject':
        const validElem = textAreas.find(elem => elem.textAreasId === fieldName);
        validationValues[fieldName] = fieldValue.length <= validElem.maxLength && fieldValue.trim().length !== 0;
        break;
      default:
        break;
    }

    this.setState({
      ...this.state,
      formValidation: {
        ...this.state.formValidation,
        [formSection]: {
          ...this.state.formValidation[formSection],
          [fieldName]: validationValues[fieldName],
        },
      },
      formErrors: {
        ...this.state.formErrors,
        [formSection]: {
          ...this.state.formErrors[formSection],
          [fieldName]: fieldValue.trim() === '' ? false : !validationValues[fieldName],
        },
      },
    }, this.validateForm);
  };

  validateForm = () => {
    const {inputs, textAreas} = this.state.formValidation;
    this.setState({
      ...this.state,
      formValidation: {
        ...this.state.formValidation,
        formValid:
            Object.values(inputs).every(item => item === true)
            &&
            Object.values(textAreas).every(item => item === true)
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      inputs: {firstName, lastName, birthday, phoneNumber, url},
      textAreas: {about, technology, lastProject},
      formValidation,
      formErrors,
    } = this.state;

    this.setState({
      ...this.state,
      formErrors: {
        inputs: {
          firstName: formErrors.inputs.firstName || firstName.trim() === '',
          lastName: formErrors.inputs.lastName || lastName.trim() === '',
          birthday: formErrors.inputs.birthday || birthday.trim() === '',
          phoneNumber: formErrors.inputs.phoneNumber || phoneNumber.trim() === '',
          url: formErrors.inputs.url || url.trim() === '',
        },
        textAreas: {
          about: formErrors.textAreas.about || about.trim() === '',
          technology: formErrors.textAreas.technology || technology.trim() === '',
          lastProject: formErrors.textAreas.lastProject || lastProject.trim() === '',
        },
      },
    });

    if (formValidation.formValid) {
      const {inputs, textAreas} = this.state;
      this.props.getProfileData({inputs: inputs, textAreas: textAreas});
    }
  };

  resetForm = () => this.setState({...this.initialState,});

  render() {
    const {title, inputs, textAreas, buttons} = this.props.formData;
    const {formValid} = this.state.formValidation;
    return (
        <form onSubmit={this.handleSubmit} action='#' className={styles.main_form}>
          <FormTitle title={title}/>
          <div className={styles.form_body}>
            <FormInputs stateValues={this.state} updateStateValues={this.updateStateValues} inputsData={inputs}/>
            <FormTextAreas stateValues={this.state} updateStateValues={this.updateStateValues}
                           textAreasData={textAreas}/>
          </div>
          <div className={styles.form_buttons}>
            {buttons.map(data =>
                <FormButton key={data.buttonId}
                            buttonsData={data}
                            resetForm={data.buttonPurpose === 'Сохранить' ? null : this.resetForm}
                            validForm={data.buttonPurpose === 'Сохранить' ? formValid : true}
                />)}
          </div>
        </form>
    );
  };
}

export default MainForm;
