import './HBtn.css';
import {darkColor, DEFAULT, isDarkMode, isWhiteMode, primaryColor, secondaryColor, whiteColor} from "../Color";


// noinspection JSXNamespaceValidation
export const HBtn = props => {
    const disabled = props.disabled | false;
    let colorStyle = {...DEFAULT.colorStyle};
    const hasText = props.text && props.text.length > 0;
    const css = ['h-btn'];

    if (hasText) {
        // noinspection JSUnresolvedVariable
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

        const hasHref = props.href && props.href.length > 0;
        if (hasHref) {
            // noinspection JSXNamespaceValidation
            return (
                <a href={props.href} className={css.join(' ')} style={disabled ? null : colorStyle}>
                    <span>{props.text}</span>
                </a>
            );
        }

        // noinspection JSUnresolvedVariable
        const outlined = props.outlined === true && !contained;
        if (outlined) {
            css.push('h-btn-outlined');
            // noinspection JSXNamespaceValidation
            return (
                <button disabled={props.disabled} className={css.join(' ')} type="button" style={disabled ? null : colorStyle}>
                    <span>{props.text}</span>
                </button>
            );
        }

        // noinspection JSXNamespaceValidation
        return (
            <button disabled={props.disabled} className={css.join(' ')} type="button"style={disabled ? null : colorStyle}>
                <span>{props.text}</span>
            </button>
        );
    }


    // noinspection JSXNamespaceValidation
    return (
        <button type="button" className={css.join(' ')} style={disabled ? null : colorStyle}>
            <span>DEFAULT</span>
        </button>
    );
};