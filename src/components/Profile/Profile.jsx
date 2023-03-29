import React from "react";
import styles from './Profile.module.css';
import FormTitle from "../MainForm/FormTitle/FormTitle";
import ProfileHeaderList from "./ProfileHeaderList/ProfileHeaderList";
import ProfileBodyList from "./ProfileBodyList/ProfileBodyList";

const Profile = ({profileData: {inputs, textAreas}, formData: {inputs: inputsFields, textAreas: textAreasFields}}) => {

  const setTitles = (section, fieldName) => section.reduce((acc, item) => ({
    ...acc,
    [item[fieldName]]: item.labelTitle,
  }), {});

  const inputsTitles = setTitles(inputsFields, 'inputId');
  const textAreasTitles = setTitles(textAreasFields, 'textAreasId');
  return (
      <section className={styles.profile}>
        <FormTitle title={`${inputs.firstName} ${inputs.lastName}`}/>
        <div className={styles.profile_top}>
          {Object.keys(inputsTitles).filter(item => !item.includes('Name')).map((fieldName, index) => (
              <ProfileHeaderList key={`${fieldName}_${index}`} inputsTitles={inputsTitles} inputs={inputs}
                                 fieldName={fieldName}/>
          ))}
        </div>
        <div className={styles.profile_body}>
          {Object.keys(textAreasTitles).map((fieldName, index) => (
              <ProfileBodyList key={`${fieldName}_${index}`} textAreasTitles={textAreasTitles} textAreas={textAreas}
                               fieldName={fieldName}/>
          ))}
        </div>
      </section>
  );
};

export default Profile;
