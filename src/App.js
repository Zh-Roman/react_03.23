import React from 'react';
import './App.css';
import MainForm from "./components/MainForm/MainForm";
import Profile from "./components/Profile/Profile";

const formData = {
  title: 'Создание анкеты',
  inputs: [
    {labelTitle: 'Имя', inputType: 'text', inputId: 'firstName', inputPlaceholder: 'Иван',},
    {labelTitle: 'Фамилия', inputType: 'text', inputId: 'lastName', inputPlaceholder: 'Иванов',},
    {labelTitle: 'Дата рождения', inputType: 'date', inputId: 'birthday', inputPlaceholder: '',},
    {labelTitle: 'Телефон', inputType: 'tel', inputId: 'phoneNumber', inputPlaceholder: '7-7777-77-77',},
    {labelTitle: 'Сайт', inputType: 'url', inputId: 'url', inputPlaceholder: 'https://example.com',},
  ],
  textAreas: [
    {labelTitle: 'О себе', areaRows: '7', maxLength: 600, textAreasId: 'about',},
    {labelTitle: 'Стек технологий', areaRows: '7', maxLength: 600, textAreasId: 'technology',},
    {labelTitle: 'Описание последнего проекта', areaRows: '7', maxLength: 600, textAreasId: 'lastProject',},
  ],
  buttons: [
    {buttonType: 'button', buttonPurpose: 'Отмена', buttonId: 1,},
    {buttonType: 'submit', buttonPurpose: 'Сохранить', buttonId: 2,},
  ],
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.formData = formData;
    this.state = {
      profileData: null,
    };
  };

  getProfileData = (dataValue) => this.setState({profileData: dataValue});

  render() {
    const {profileData} = this.state;
    return (
        <main className='app_styles'>
          {profileData ? (
              <Profile profileData={profileData} formData={this.formData}/>
          ) : (
              <MainForm formData={this.formData} getProfileData={this.getProfileData}/>
          )}
        </main>
    );
  };
}

export default App;
