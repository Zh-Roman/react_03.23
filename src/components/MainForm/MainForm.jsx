import React, {useEffect, useState} from "react";
import styles from './MainForm.module.css'
import FormTitle from "./FormTitle/FormTitle";
import FormInputs from "./FormInputs/FormInputs";
import FormTextAreas from "./FormTextAreas/FormTextAreas";
import FormButton from "./FormButton/FormButton";

const NAME_REGEX = /^([А-ЯЁ][а-яё]{1,19}|[A-Z][a-z]{1,19})$/;
const BIRTH_REGEX = /^(\d{4}-\d{2}-\d{2})$/;
const PHONE_REGEX = /^(\d-\d{4}-\d{2}-\d{2})$/;
const URL_REGEX = /^(https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)$/i;
const initialState = {
  formValues: {
    inputs: {firstName: '', lastName: '', birthday: '', phoneNumber: '', url: '',},
    textAreas: {about: '', technology: '', lastProject: '',},
  },
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
const MainForm = ({formData: {title, inputs, textAreas, buttons}, getProfileData}) => {
  const [formValues, setFormValues] = useState(initialState.formValues);
  const [formValidation, setFormValidation] = useState(initialState.formValidation);
  const [formErrors, setFormErrors] = useState(initialState.formErrors);
  const [updateData, setUpdateData] = useState({
    formSection: null,
    fieldName: null,
    fieldValue: null,
  });
  const stateValue = {
    ...formValues,
    formValidation: {
      ...formValidation,
    },
    formErrors: {
      ...formErrors,
    },
  };
  const updateStateValues = (formSection, fieldName, fieldValue) => {
    setFormValues({...formValues, [formSection]: {...formValues[formSection], [fieldName]: fieldValue}});
    setUpdateData({formSection: formSection, fieldName: fieldName, fieldValue: fieldValue});
  };
  const validateField = (formSection, fieldName, fieldValue) => {
    if (formSection && fieldName && fieldValue !== null) {
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

      setFormValidation({
        ...formValidation,
        [formSection]: {...formValidation[formSection], [fieldName]: validationValues[fieldName]},
      });
      setFormErrors({
        ...formErrors,
        [formSection]: {
          ...formErrors[formSection],
          [fieldName]: fieldValue.trim() === '' ? false : !validationValues[fieldName],
        },
      });
    }
  };
  const validateForm = () => {
    const {inputs, textAreas} = formValidation;
    if (Object.values(inputs).every(item => item === true) && Object.values(textAreas).every(item => item === true)) {
      setFormValidation({...formValidation, formValid: true});
    } else {
      setFormValidation({...formValidation, formValid: false});
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {firstName, lastName, birthday, phoneNumber, url} = formValues.inputs;
    const {about, technology, lastProject} = formValues.textAreas;
    setFormErrors({
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
    });

    if (formValidation.formValid) {
      getProfileData(formValues);
    }
  };
  const resetForm = () => {
    setFormValues(initialState.formValues);
    setFormValidation(initialState.formValidation);
    setFormErrors(initialState.formErrors);
  };

  useEffect(() => {
    const {formSection, fieldName, fieldValue} = updateData;
    validateField(formSection, fieldName, fieldValue);
  }, [formValues, updateData]);

  useEffect(() => {
    validateForm();
  }, [formValidation.inputs, formValidation.textAreas]);

  return (
      <form onSubmit={handleSubmit} action='#' className={styles.main_form}>
        <FormTitle title={title}/>
        <div className={styles.form_body}>
          <FormInputs stateValues={stateValue} updateStateValues={updateStateValues} inputsData={inputs}/>
          <FormTextAreas stateValues={stateValue} updateStateValues={updateStateValues}
                         textAreasData={textAreas}/>
        </div>
        <div className={styles.form_buttons}>
          {buttons.map(data =>
              <FormButton key={data.buttonId}
                          buttonsData={data}
                          resetForm={data.buttonPurpose === 'Сохранить' ? null : resetForm}
                          validForm={data.buttonPurpose === 'Сохранить' ? formValidation.formValid : true}
              />)}
        </div>
      </form>
  );
}

export default MainForm;
