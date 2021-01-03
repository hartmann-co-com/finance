//region common
const Common = ({css}) => {
    // noinspection JSXNamespaceValidation
    return <i className={css}/>;
}
//endregion common

// region image
// noinspection JSUnusedGlobalSymbols
export const ImgPlaceholder = () => {
    return <Common css="fa fa-image"/>;
};
// endregion image

// region euro
export const EuroPlaceholder = () => {
    // noinspection JSXNamespaceValidation
    return <Common css="fa fa-euro-sign"/>;
};
// endregion euro

// region arrow
export const ArrowRightPlaceholder = () => {
    return <Common css="fa fa-chevron-right"/>;
};

// noinspection JSUnusedGlobalSymbols
export const ArrowLeftPlaceholder = () => {
    return <Common css="fa fa-chevron-left"/>;
};

// noinspection JSUnusedGlobalSymbols
export const ArrowUpPlaceholder = () => {
    return <Common css="fa fa-chevron-up"/>;
};

export const ArrowDownPlaceholder = () => {
    return <Common css="fa fa-chevron-down"/>;
};
// endregion arrow

// region save
export const SavePlaceholder = () => {
    // noinspection JSXNamespaceValidation
    return <Common css="fa fa-save"/>;
};
// endregion save

// region clear
export const ClearPlaceholder = () => {
    // noinspection JSXNamespaceValidation
    return <Common css="fa fa-backspace"/>;
};
// endregion clear

// region upload
export const UploadPlaceholder = () => {
    // noinspection JSXNamespaceValidation
    return <Common css="fa fa-upload"/>;
};
// endregion upload

// region download
export const DownloadPlaceholder = () => {
    // noinspection JSXNamespaceValidation
    return <Common css="fa fa-download"/>;
};
// endregion download

// region add
export const AddPlaceholder = () => {
    // noinspection JSXNamespaceValidation
    return <Common css="fa fa-plus"/>;
};
// endregion add

// region edit
export const EditPlaceholder = () => {
    // noinspection JSXNamespaceValidation
    return <Common css="fa fa-edit"/>;
};
// endregion edit

// region spinner
export const Spinner = () => {
    // noinspection JSXNamespaceValidation
    return <Common css="fa fa-spinner fa-spin"/>;
}
// endregion spinner

// region spacer
export const Spacer = ({half}) => {
    // noinspection JSXNamespaceValidation
    return (
        <>
            {
                half === true
                    ? <div style={{width: '0.5em', height: '1em'}}/>
                    : <div style={{width: '1em', height: '1em'}}/>
            }
        </>
    );
}
// endregion spacer

// region import
export const FileImportPlaceholder = () => {
    // noinspection JSXNamespaceValidation
    return <Common css="fa fa-file-import"/>;
}
// endregion import

// region export
export const FileExportPlaceholder = () => {
    // noinspection JSXNamespaceValidation
    return <Common css="fa fa-file-export"/>;
}
// endregion export