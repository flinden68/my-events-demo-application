import React from 'react';
import { withLocalize, Translate } from 'react-localize-redux';
import { Link} from "react-router-dom";
import './language.css';

const LanguageToggle = ({languages, activeLanguage, setActiveLanguage}) => {
  const getClass = (languageCode) => {
    return languageCode === activeLanguage.code ? 'active' : ''
  };

  return (
    <div id="language-bar" className="language-bar">
    <ul className="language-list">
      {languages.map(lang => 
        <li key={ lang.code }>
          <a className={getClass(lang.code)} onClick={() => setActiveLanguage(lang.code)}>
                <Translate id={'language-'+lang.code}></Translate>
            </a>       
        </li>
      )}
    </ul>
    </div>
  );
};

export default withLocalize(LanguageToggle);