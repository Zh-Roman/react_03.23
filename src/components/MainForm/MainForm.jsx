import React from "react";
import styles from './MainForm.module.css'
import FormTitle from "./FormTitle/FormTitle";
import FormInputs from "./FormInputs/FormInputs";
import FormTextAreas from "./FormTextAreas/FormTextAreas";
import FormButton from "./FormButton/FormButton";


class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      inputs: {
        firstName: '',
        lastName: '',
        birthday: '',
        phoneNumber: '',
        url: '',
      },
      textAreas: {
        about: '',
        technology: '',
        lastProject: '',
      },
    };
    this.state = this.initialState;
  };

  updateStateValues = (formSection, inputName, inputValue) => {
    this.setState({
      ...this.state,
      [formSection]: {
        ...this.state[formSection],
        [inputName]: inputValue,
      }
    });
  };
  handleSubmit = (e) => {
    const {inputs, textAreas} = this.state;
    e.preventDefault();
    console.group(`%c Saved form data values (state)`, `color: #FF3300`);
    console.group(`Inputs values:`);
    for (let i of Object.keys(inputs)) {
      console.log(`${i} : ${inputs[i]}`)
    }
    console.groupEnd();
    console.group(`Text Areas values:`);
    for (let i of Object.keys(textAreas)) {
      console.log(`${i} : ${textAreas[i]}`)
    }
    console.groupEnd();
    console.groupEnd();
    console.group(`%c State value without modification`, `color: #FF3300`);
    console.log(this.state);
    console.groupEnd();
    this.props.showForm(false);
  };
  resetForm = () => {
    this.setState({
      ...this.initialState,
    });
    this.props.showForm(true);
  };

  render() {
    const {title, inputs, textAreas, buttons} = this.props.formData;
    return (
        <form onSubmit={this.handleSubmit} action='#' className={styles.main_form}>
          <FormTitle title={title}/>
          {(inputs && textAreas) ? (
              <div className={styles.form_body}>
                <FormInputs stateValues={this.state} updateStateValues={this.updateStateValues}
                            inputsData={inputs}/>
                <FormTextAreas stateValues={this.state} updateStateValues={this.updateStateValues}
                               textAreasData={textAreas}/>
              </div>
          ) : null}

          <div className={styles.form_buttons}>
            {buttons.map(data =>
                <FormButton key={data.buttonId}
                            buttonsData={data}
                            resetForm={data.buttonPurpose === 'Сохранить' ? null : this.resetForm}
                />)}
          </div>
        </form>
    );
  };
}


export default MainForm;
