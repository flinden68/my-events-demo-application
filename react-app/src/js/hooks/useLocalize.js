import {useSelector} from "react-redux";
import {getActiveLanguage} from "react-localize-redux";

const useLocalize = () => {
    const localize = useSelector(state => state.localize);
    const code = getActiveLanguage(localize)?.code;
    const currentLanguage = getActiveLanguage(localize)
    return {
        localize,
        code,
        currentLanguage
    };
};
export default useLocalize;
