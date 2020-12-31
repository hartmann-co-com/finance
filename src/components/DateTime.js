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

export const DisplayDate = ({date}) => {
    // noinspection JSXNamespaceValidation
    return <>
        <div style={flexContainer.noPadding}>
            {date().toLocaleDateString()}
            <Spacer half={true}/>
            {date().toLocaleTimeString()}
        </div>
    </>;
};