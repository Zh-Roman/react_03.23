import React from "react";
import styles from './InputNote.module.css';

class InputNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  inputNoteText = (inputName) => {
    switch (inputName) {
      case 'firstName':
      case 'lastName':
        return 'От 2 до 20 символов.\nПервый символ заглавный.\nРазрешены только буквенные значения.';
      case 'birthday':
        return 'Выберите дату рождения, нажав иконку календаря.';
      case 'phoneNumber':
        return 'Разрешен ввод только цифр.'
      case 'url':
        return 'Адрес сайта должен начинаться с https://';
      default:
        break;
    }
  };

  render() {
    const {id, inputId} = this.props;
    return (
        <p id={id} className={styles.input_note}>
          {this.inputNoteText(inputId)}
        </p>
    );
  };
}

export default InputNote;
