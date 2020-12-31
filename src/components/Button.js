// region common
import {
    AddPlaceholder, ClearPlaceholder, DownloadPlaceholder,
    EditPlaceholder,
    EuroPlaceholder,
    SavePlaceholder,
    Spacer,
    UploadPlaceholder
} from "./Placeholders";
import {flexContainer} from "../flex";
import {state} from "../App";

const nowrap = {"white-space": 'nowrap'};

const Common = ({onClick, children, input, inputType, inputOnChange}) => {
    // noinspection JSXNamespaceValidation
    return (<>
            {
                input === true
                    ? <label style={{
                        'background-color': 'transparent',
                        'border': '1px solid #878787',
                        'border-radius': '1em',
                        'font-size': '14px',
                        cursor: 'pointer',
                        padding: '0.2em 0.6em 0.2em 0.6em'
                    }}>
                        {children}
                        <input onClick={onClick}
                               onChange={inputOnChange}
                               style={{display: 'none'}}
                               type={inputType}/>
                    </label>
                    :
                    <button onClick={onClick}
                            style={{
                                'background-color': 'transparent',
                                'border': '1px solid #878787',
                                'border-radius': '1em',
                                'font-size': '14px',
                                cursor: 'pointer',
                                padding: '0.2em 0.6em 0.2em 0.6em'
                            }}>
                        {children}
                    </button>
            }
        </>
    );
}
// endregion common

// region save-btn
export const SaveBtn = ({onClick}) => {
    const [getStore, dispatch] = state;
    const width = window.innerWidth > getStore().minWidth;
    // noinspection JSXNamespaceValidation
    return (
        <Common onClick={onClick}>
            <div style={flexContainer.button}>
                <SavePlaceholder/>
                {width && <Spacer/>}
                {width && <div style={nowrap}>Save now</div>}
            </div>
        </Common>
    );
}
// endregion save-btn

// region clear-btn
export const ClearBtn = ({onClick}) => {
    const [getStore, dispatch] = state;
    const width = window.innerWidth > getStore().minWidth;
    // noinspection JSXNamespaceValidation
    return (
        <Common onClick={onClick}>
            <div style={flexContainer.button}>
                <ClearPlaceholder/>
                {width && <Spacer/>}
                {width && <div style={nowrap}>Clear</div>}
            </div>
        </Common>
    );
};
// endregion clear-btn

// region upload-btn
export const UploadBtn = ({onClick}) => {
    // noinspection JSXNamespaceValidation
    return (
        <Common inputOnChange={onClick} input={true} inputType="file">
            <div style={flexContainer.button}>
                <UploadPlaceholder/>
                <Spacer/>
                <div style={nowrap}>Upload records csv-file</div>
            </div>
        </Common>
    );
}
// endregion upload-btn

// region download-btn
export const DownloadBtn = ({onClick}) => {
    // noinspection JSXNamespaceValidation
    return (
        <Common onClick={onClick}>
            <div style={flexContainer.button}>
                <DownloadPlaceholder/>
                <Spacer/>
                <div style={nowrap}>Download records csv-file</div>
            </div>
        </Common>
    );
};
// endregion upload-btn

// region add-btn
export const AddBtn = ({onClick, text}) => {
    // noinspection JSXNamespaceValidation
    return (
        <Common onClick={onClick}>
            <div style={flexContainer.button}>
                <AddPlaceholder/>
                <Spacer/>
                <div style={nowrap}>{text}</div>
            </div>
        </Common>
    );
}
// endregion add-btn

// region edit-btn
export const EditBtn = ({onClick}) => {
    // noinspection JSXNamespaceValidation
    return (
        <Common onClick={onClick}>
            <div style={flexContainer.button}>
                <EditPlaceholder/>
                <Spacer/>
                <div style={nowrap}>Edit record</div>
            </div>
        </Common>
    );
}
// endregion edit-btn

// region menu-btn
export const SideMenuBtn = ({onClick}) => {
    return (
        <Common onClick={onClick}>
            <EuroPlaceholder/>
        </Common>
    );
}
// endregion menu-btn