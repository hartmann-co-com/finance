import './Separator.css';
import {darkColor, isDarkMode, whiteColor} from "../Color";

export const separator = {
    width: 'calc(100% - 2em)'
};

export const Separator = (props) => {
    let style = {...separator, color: isDarkMode() ? whiteColor : darkColor};
    // noinspection JSXNamespaceValidation
    return (
        <div style={style} className="separator">
            {props.children}
        </div>
    );
};

export const EmptySeparator = () => {
    let style = {
        color: isDarkMode() ? whiteColor : darkColor,
        'padding-bottom': '1.5em'
    };
    return (
        <div style={style}>
            <div style={separator} className="separator-empty"/>
        </div>
    );
};