import {Spacer} from "./Placeholders";
import {flexContainer} from "../flex";

export const MONTHS = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}

export const DisplayDate = ({date, small}) => {
    const style = {...flexContainer.noPadding};

    if (small) {
        style["font-size"] = 'x-small';
    }

    // noinspection JSXNamespaceValidation
    return <>
        <div style={style}>
            <div style={{display: 'flex', 'font-family': 'courier'}}>{date().toLocaleDateString()}</div>
            <Spacer half={true}/>
            <div style={{display: 'flex', 'font-family': 'courier'}}>{date().toLocaleTimeString()}</div>
        </div>
    </>;
};