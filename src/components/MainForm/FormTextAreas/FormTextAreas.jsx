import React from "react";
import styles from './FormTextAreas.module.css';

class FormTextAreas extends React.Component {
  constructor(props) {
    super(props);

    this.formSectionName = 'textAreas';
    this.state = {};
  }


  render() {
    return (
        <div className={styles.text_areas}>
          {this.props.textAreasData.map(data =>
              <div key={data.textAreasId}>
                <label htmlFor={data.textAreasId}>{data.labelTitle}</label>
                <textarea rows={data.areaRows}
                          name={data.textAreasId}
                          id={data.textAreasId}
                          value={this.props.stateValues[this.formSectionName][data.textAreasId]}
                          onChange={event =>
                              this.props.updateStateValues(this.formSectionName, data.textAreasId, event.target.value)}
                          required></textarea>
              </div>
          )}
        </div>
    );
  };
}

export default FormTextAreas;
