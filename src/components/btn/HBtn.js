import './HBtn.css';
import {darkColor, DEFAULT, isDarkMode, isWhiteMode, primaryColor, secondaryColor, whiteColor} from "../Color";


// noinspection JSXNamespaceValidation
export const HBtn = props => {
    const disabled = props.disabled | false;
    let colorStyle = {...DEFAULT.colorStyle};
    const hasText = props.text && props.text.length > 0;
    const css = ['h-btn'];

    if (props.primary === true) {
        colorStyle = {...colorStyle, color: primaryColor};
        css.push('h-primary');
    } else if (props.secondary === true) {
        colorStyle = {...colorStyle, color: secondaryColor};
        css.push('h-secondary');
    } else if (isWhiteMode()) {
        css.push('h-dark');
    } else if (isDarkMode()) {
        css.push('h-white');
    }

    // noinspection JSUnresolvedVariable
    const contained = props.contained === true;
    if (contained) {
        colorStyle = {...colorStyle, color: isDarkMode() ? darkColor : whiteColor};
        css.push('h-btn-contained');
    }
    // noinspection JSUnresolvedVariable
    const outlined = props.outlined === true && !contained;

    const hasHref = props.href && props.href.length > 0;
    if (hasHref) {
        if (disabled) css.push('h-btn-disabled');
        // noinspection JSXNamespaceValidation
        return (
            <a href={disabled ? '#' : props.href}
               className={css.join(' ')}
               style={disabled ? null : colorStyle}>
                {
                    hasText
                        ? <span>{props.text}</span>
                        : (props.children ? props.children : null)
                }
            </a>
        );
    }

    if (outlined) {
        css.push('h-btn-outlined');
    }

    // noinspection JSXNamespaceValidation
    return (
        <button disabled={props.disabled} className={css.join(' ')} type="button" style={disabled ? null : colorStyle}>
            {hasText ? <span>{props.text}</span> : (props.children ? props.children : null)}
        </button>
    );

};