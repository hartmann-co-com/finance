import './Separator.css';

export const separator = {
    color: '#cfcfcf',
    width: 'calc(100% - 2em)'
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