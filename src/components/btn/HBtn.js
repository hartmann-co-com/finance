import './HBtn.css';
import {darkColor, DEFAULT, primaryColor} from "../Color";


// noinspection JSXNamespaceValidation
export const HBtn = props => {
    let colorStyle = {...DEFAULT.colorStyle};
    const hasText = props.text && props.text.length > 0;

    if (hasText) {
        // noinspection JSUnresolvedVariable
        if (props.primary === true) {
            colorStyle = {...DEFAULT.primaryColorStyle};
        }

        // noinspection JSUnresolvedVariable
        const contained = props.contained === true;
        if (contained) {
            colorStyle = {
                ...colorStyle,
                'background-color': colorStyle.color,
                color: darkColor
            };
        }

        const hasHref = props.href && props.href.length > 0;
        if (hasHref) {
            // noinspection JSXNamespaceValidation
            return (
                <a href={props.href} className="h-btn" style={colorStyle}>
                    <span>{props.text}</span>
                </a>
            );
        }

        // noinspection JSUnresolvedVariable
        const outlined = props.outlined === true && !contained;
        if (outlined) {
            // noinspection JSXNamespaceValidation
            return (
                <button className="h-btn h-btn-outlined" type="button" style={colorStyle}>
                    <span>{props.text}</span>
                </button>
            );
        }

        // noinspection JSXNamespaceValidation
        return (
            <button className="h-btn" type="button" style={colorStyle}>
                <span>{props.text}</span>
            </button>
        );
    }

    // noinspection JSXNamespaceValidation
    return (
        <button type="button" style={colorStyle}>
            <span>DEFAULT</span>
        </button>
    );
};