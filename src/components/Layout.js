import {EuroPlaceholder, FileExportPlaceholder, FileImportPlaceholder, Spacer} from "./Placeholders";
import {flexContainer} from "../flex";
import {HBtn} from "./btn/HBtn";

// region Header
export const Header = () => {
    // const [getStore, dispatch] = state;
    // noinspection JSXNamespaceValidation
    return (
        <div style={flexContainer} class="shadow">
            <HBtn primary>
                <label><EuroPlaceholder/>Finance</label>
            </HBtn>
        </div>
    );
};

export const FixedHeader = () => {
    return (
        <div style={{flex: 1}}>
            <Header/>
        </div>
    );
}
//endregion Header

//region SideMenu
export const FixedSideMenu = ({children}) => {
    return (
        <div style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            "background-color": "rgba(135, 135, 135, 0.75)"
        }}>
            <div style={{"background-color": 'white', width: "20em", height: "calc(100% - 4.25em)"}}>
                {children}
            </div>
        </div>
    );
}

export const FixedSideMenuContent = () => {
    return (
        <>
            <div>Import / Export</div>
            <ul>
                <li><a>
                    <div style={flexContainer.menu}>
                        <span style={{width: '1em'}}><FileImportPlaceholder/></span>
                        <Spacer half={true}/>
                        <label>Import</label>
                    </div>
                </a></li>
                <li><a>
                    <div style={flexContainer.menu}>
                        <span style={{width: '1em'}}><FileExportPlaceholder/></span>
                        <Spacer half={true}/>
                        <label>Export</label>
                    </div>
                </a></li>
            </ul>
        </>
    );
}
//endregion

//region Content
export const Content = (props) => {
    return (
        <div style={{'flex-grow': 1, overflow: 'auto'}}>
            {props.children}
        </div>
    );
}
//endregion Content