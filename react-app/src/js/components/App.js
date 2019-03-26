import React from "react";
import Routes from './Routes'
import NavBar from "./NavBar";
import { withLocalize} from 'react-localize-redux';
import globalTranslations from '../translations/global.json';
import { renderToStaticMarkup } from 'react-dom/server';

class App extends React.Component {
    constructor(props){
        super(props);

        this.props.initialize({
            languages: [
              { name: 'English', code: 'en' }, 
              { name: 'Dutch', code: 'nl' }
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup }
          });
    }

    componentDidUpdate(prevProps) {
        const prevLangCode = prevProps.activeLanguage && prevProps.activeLanguage.code;
        const curLangCode = this.props.activeLanguage && this.props.activeLanguage.code;
        const hasLanguageChanged = prevLangCode !== curLangCode;
        //console.log("hasLanguageChanged: " + hasLanguageChanged);
      }

    render() {
        return (<div>
            <NavBar />
            <Routes/>
        </div>)
    }
};
export default withLocalize(App);