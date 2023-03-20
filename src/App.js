import React from 'react';
import './App.css';
import MainForm from "./components/MainForm/MainForm";

const formData = {
  title: 'Создание анкеты',
  inputs: [
    {
      labelTitle: 'Имя',
      inputType: 'text',
      inputId: 'firstName',
      inputPlaceholder: 'Иван',
    },
    {
      labelTitle: 'Фамилия',
      inputType: 'text',
      inputId: 'lastName',
      inputPlaceholder: 'Иванов',
    },
    {
      labelTitle: 'Дата рождения',
      inputType: 'date',
      inputId: 'birthday',
      inputPlaceholder: '',
    },
    {
      labelTitle: 'Телефон',
      inputType: 'tel',
      inputId: 'phoneNumber',
      inputPlaceholder: '+375291112233',
    },
    {
      labelTitle: 'Сайт',
      inputType: 'url',
      inputId: 'url',
      inputPlaceholder: 'https://example.com',
    },
  ],
  textAreas: [
    {
      labelTitle: 'О себе',
      areaRows: '7',
      textAreasId: 'about',
    },
    {
      labelTitle: 'Стек технологий',
      areaRows: '7',
      textAreasId: 'technology',
    },
    {
      labelTitle: 'Описание последнего проекта',
      areaRows: '7',
      textAreasId: 'lastProject',
    },
  ],
  buttons: [
    {
      buttonType: 'button',
      buttonPurpose: 'Отмена',
      buttonId: 1,
    },
    {
      buttonType: 'submit',
      buttonPurpose: 'Сохранить',
      buttonId: 2,
    },
  ],
};

const savedFormInfo = {
  title: 'Спасибо, анкета сохранена.',
  buttons: [
    {
      buttonType: 'button',
      buttonPurpose: 'Создать новую анкету',
      buttonId: 1,
    },
  ],
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.formData = formData;
    this.savedFormInfo = savedFormInfo;
    this.state = {
      showForm: true,
    };
  };

  showFormFn = (value) => {
    this.setState({showForm: value});
  };

  render() {
    return (
        <main className='app_styles'>
          {this.state.showForm ? (
              <MainForm formData={this.formData} showForm={this.showFormFn}/>
          ) : (
              <MainForm formData={this.savedFormInfo} showForm={this.showFormFn}/>
          )}
        </main>
    );
  };
}

export default App;
