import React from "react";
import styles from './InputNote.module.css';

const InputNote = ({id, inputId}) => {
  const inputNoteText = (inputName) => {
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
  return (
      <p id={id} className={styles.input_note}>
        {inputNoteText(inputId)}
      </p>
  );
}

export default InputNote;
