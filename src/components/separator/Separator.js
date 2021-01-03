import './Separator.css';

export const separator = {
    color: '#cfcfcf'
};

export const Separator = (props) => {
    // noinspection JSXNamespaceValidation
    return (
        <div style={separator} className="separator">
            {props.children}
        </div>
    );
};

export const EmptySeparator = () => {
    return (
        <div style={{"padding-bottom": '1.5em'}}>
            <div style={separator} className="separator-empty"/>
        </div>
    );
};