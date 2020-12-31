// region common
import {state} from "../App";
import {EmptySeparator, separator, Separator} from "./separator/Separator";
import {ArrowDownPlaceholder, ArrowRightPlaceholder, Spacer, Spinner} from "./Placeholders";
import {flexContainer} from "../flex";
import {AddBtn, ClearBtn, DownloadBtn, SaveBtn, UploadBtn} from "./Button";
import {exportFunc, importFunc} from "../csv/csv";
import {DisplayDate, MONTHS} from "./DateTime";
import {createState} from "solid-js";
import {Actions} from "../state/actions";
import {clearList, saveList} from "../state/functions";
import {nanoid} from "nanoid";
import {Number} from "./Number";

const listStyle = {'list-style-type': 'decimal', width: '100%'};

const listStyleNone = {...listStyle, 'list-style-type': 'none'};

const Timeline = () => {
    const [getStore, dispatch] = state;
    // noinspection JSXNamespaceValidation
    return (
        <>
            {
                getStore().list?.length > 0
                    ? getStore().list
                        // .filter(y => y.year === new Date().getUTCFullYear())
                        .map((y, i) => <ul style={{'padding-inline-start': '1em'}}>
                                {
                                    i % 2 === 0
                                        ? <div style={flexContainer.marginRight} className="odd">
                                            <li style={listStyleNone}>
                                                <Year year={y} index={i}/>
                                            </li>
                                        </div>
                                        : <div style={flexContainer.marginRight} className="even">
                                            <li style={listStyleNone}>
                                                <Year year={y} index={i}/>
                                            </li>
                                        </div>
                                }
                            </ul>
                        )
                    : <>
                        <div style={flexContainer.noPadding} className="padding-inline-start">
                            <label>no entries</label>
                            <Spacer/>
                            <UploadBtn onClick={(event) => importFunc(event)}/>
                        </div>
                    </>
            }
            <EmptySeparator/>
            <div style={{'padding-inline-start': '1em'}}>
                <div style={flexContainer.marginRight}>
                    <label style={{margin: '0 0 0 1em'}}>Summary</label>
                    <label style={{margin: '0 1em 0 0', "padding-right": '1em'}}>
                        <Number decimal={getStore().list.reduce((p, c) => p + c.balance, 0)}/>
                    </label>
                </div>
            </div>
        </>
    );
};

const Year = ({year, index}) => {
    const [self, setSelf] = createState({expanded: year.expanded});
    const [getStore, dispatch] = state;
    // noinspection JSCheckFunctionSignatures, JSXNamespaceValidation
    return (
        <>
            <div style={flexContainer.spaceBetween}>
                <div style={flexContainer.noPadding}>
                    <div onClick={() => {
                        // noinspection JSCheckFunctionSignatures
                        setSelf('expanded', ex => !ex);
                        year.expanded = self.expanded;
                        dispatch({type: Actions.list.update.year, payload: {index: index, value: year}});
                    }}>
                        {self.expanded === false && <ArrowRightPlaceholder/>}
                        {self.expanded === true && <ArrowDownPlaceholder/>}
                    </div>
                    <label
                        style={{margin: '0 0 0 1em'}}>{year.year}</label>
                </div>

                <label style={{margin: '0 1em 0 0', "padding-right": '1.5em'}}>
                    <Number decimal={year.balance}/>
                </label>
            </div>
            {self.expanded === true && <Months values={year.months} year={year.year}/>}
        </>
    );
};

const Month = ({month, year, index}) => {
    const [self, setSelf] = createState({expanded: month.expanded});
    const [getStore, dispatch] = state;
    // noinspection JSXNamespaceValidation,JSCheckFunctionSignatures
    return (
        <>
            <div style={flexContainer.spaceBetween}>
                <div style={flexContainer.noPadding}>
                    <div onClick={() => {
                        // noinspection JSCheckFunctionSignatures
                        setSelf('expanded', ex => !ex);
                        month.expanded = self.expanded;
                        dispatch({
                            type: Actions.list.update.month,
                            payload: {index: index, year: year, value: {...month}}
                        });
                    }}>
                        {self.expanded === false && <ArrowRightPlaceholder/>}
                        {self.expanded === true && <ArrowDownPlaceholder/>}
                    </div>
                    <label
                        style={{margin: '0 0 0 1em'}}>{MONTHS[month.month]}</label>
                </div>
                <label style={{margin: '0 1em 0 0', "padding-right": '1em'}}>
                    <Number decimal={month.balance}/>
                </label>
            </div>
            {self.expanded === true && <Days values={month.days} year={year} month={month.month}/>}
        </>
    );
};

const Months = ({values, year}) => {
    return (
        <>
            {
                values.length > 0
                    ? values.map((m, i) => <ul style={{'padding-inline-start': '1em'}}>
                        {
                            i % 2 === 0
                                ? <div style={flexContainer.spaceBetween} className="odd">
                                    <li style={listStyleNone}>
                                        <Month month={m} year={year} index={i}/>
                                    </li>
                                </div>
                                : <div style={flexContainer.spaceBetween} className="even">
                                    <li style={listStyleNone}>
                                        <Month month={m} year={year} index={i}/>
                                    </li>
                                </div>
                        }
                    </ul>)
                    : null
            }
        </>
    );
};

const Days = ({values, year, month}) => {
    return (
        <>
            {
                values.length > 0
                    ? values.map((d, i) => <ul style={{'padding-inline-start': '1em'}}>
                        {
                            i % 2 === 0
                                ? <div style={flexContainer.spaceBetween} className="odd">
                                    <li style={listStyleNone}>
                                        <Day day={d} year={year} month={month} index={i}/>
                                    </li>
                                </div>
                                : <div style={flexContainer.spaceBetween} className="even">
                                    <li style={listStyleNone}>
                                        <Day day={d} year={year} month={month} index={i}/>
                                    </li>
                                </div>
                        }
                    </ul>)
                    : null
            }
        </>
    );
};

const Day = ({day, year, month, index}) => {
    const [self, setSelf] = createState({expanded: day.expanded});
    const [getStore, dispatch] = state;
    // noinspection JSXNamespaceValidation,JSCheckFunctionSignatures
    return (
        <>
            <div style={flexContainer.spaceBetween}>
                <div style={flexContainer.noPadding}>
                    <div onClick={() => {
                        // noinspection JSCheckFunctionSignatures
                        setSelf('expanded', ex => !ex);
                        day.expanded = self.expanded;
                        dispatch({
                            type: Actions.list.update.day,
                            payload: {index: index, year: year, month: month, value: {...day}}
                        });
                    }}>
                        {self.expanded === false && <ArrowRightPlaceholder/>}
                        {self.expanded === true && <ArrowDownPlaceholder/>}
                    </div>
                    <label
                        style={{margin: '0 0 0 1em'}}>Day {day.day}</label>
                </div>
                <label style={{margin: '0 1em 0 0', "padding-right": '0.5em'}}>
                    <Number decimal={day.balance}/>
                </label>
            </div>
            {self.expanded === true && <Records values={day.records} dispatch={true}/>}
        </>
    );
};

const Records = ({values, dispatch}) => {
    // noinspection JSXNamespaceValidation
    return (
        <>
            <ul style={{'padding-inline-start': '1em'}}>
                {
                    values.length > 0
                        ? values.map((r, i) =>
                            i % 2 === 0
                                ? <div style={flexContainer.spaceBetween} className="odd">
                                    <li style={listStyleNone}>
                                        <Record record={r} index={i} dispatchEnabled={dispatch}/>
                                    </li>
                                </div>
                                : <div style={flexContainer.spaceBetween} className="even">
                                    <li style={listStyleNone}>
                                        <Record record={r} index={i} dispatchEnabled={dispatch}/>
                                    </li>
                                </div>)
                        : null
                }
            </ul>
        </>
    );
};

const Record = ({record, accountEditable = false, balanceEditable = false, index, dispatchEnabled = false}) => {
    const [getStore, dispatch] = state;
    const date = record.timestamp ? new Date(record.timestamp) : new Date();

    const flexStyle = {
        ...flexContainer.noPadding,
        'flex-direction': 'column',
        'align-items': 'flex-start',
        margin: '0 0 0 1em'
    };
    const flexEndStyle = {
        ...flexContainer.noPadding,
        'align-items': 'flex-end'
    }
    const small = {
        'font-size': 'x-small'
    }
    // noinspection JSXNamespaceValidation,JSCheckFunctionSignatures
    return (
        <>
            <div style={{display: 'grid', 'grid-template-columns': '33% 33% 33%'}}>
                <div style={{...flexStyle}}>
                    <label style={small}>
                        <DisplayDate date={() => date}/>
                    </label>
                    {accountEditable
                        ? <input type="text" value={record.account}/>
                        : <label>
                            {record.account}
                        </label>
                    }
                </div>
                <div style={{...flexStyle, 'text-align': 'right', 'align-items': 'flex-end'}}>
                    <div style={{...flexStyle}}>
                        <div style={{...flexEndStyle, 'text-align': 'left'}}>
                            {
                                record.isBank === true
                                    ? <input type="checkbox" id={`isBank_${record.id}`}
                                             onChange={event => {
                                                 record.isBank = Boolean(event.target.checked);
                                                 if (dispatchEnabled) {
                                                     dispatch({
                                                         type: Actions.record,
                                                         payload: {index: index, value: record}
                                                     });
                                                 }
                                             }}
                                             checked/>
                                    : <input type="checkbox" id={`isBank_${record.id}`}
                                             onChange={event => {
                                                 record.isBank = Boolean(event.target.checked);
                                                 if (dispatchEnabled) {
                                                     dispatch({
                                                         type: Actions.record,
                                                         payload: {index: index, value: record}
                                                     });
                                                 }
                                             }}
                                    />
                            }
                            <label for={`isBank_${record.id}`}>is bank account</label>
                        </div>
                        <div style={flexEndStyle}>
                            {
                                record.isStock === true
                                    ? <input type="checkbox" id={`ìsStock_${record.id}`}
                                             onChange={event => {
                                                 record.isStock = event.target.checked;
                                                 if (dispatchEnabled) {
                                                     dispatch({
                                                         type: Actions.record,
                                                         payload: {index: index, value: record}
                                                     });
                                                 }
                                             }}
                                             checked/>
                                    : <input type="checkbox" id={`ìsStock_${record.id}`}
                                             onChange={event => {
                                                 record.isStock = event.target.checked;
                                                 if (dispatchEnabled) {
                                                     dispatch({
                                                         type: Actions.record,
                                                         payload: {index: index, value: record}
                                                     });
                                                 }
                                             }}
                                    />
                            }
                            <label for={`ìsStock_${record.id}`}>is stock</label>
                        </div>
                    </div>
                </div>
                <label style={{margin: '0 0.7em 0 0', 'flex-grow': 3, "text-align": 'right'}}>
                    <Number decimal={record.balance} editable={balanceEditable}/>
                </label>
            </div>
        </>
    );
};
// endregion common

// region SaveInfos
export const SaveInfos = () => {
    const [getStore, dispatch] = state;
    const width = window.innerWidth > getStore().minWidth;
    // noinspection JSXNamespaceValidation
    return (
        <>
            <div style={flexContainer.end}>
                {getStore().save.saving ? <Spinner/> : null}
                <Spacer/>
                {
                    getStore().save.iso
                        ? <div
                            style={{...flexContainer.noPadding, "flex-direction": 'column', "align-items": 'flex-start'}}>
                            <label style={{"font-size": 'x-small'}}>Last saved on:</label>
                            <DisplayDate date={() => getStore().save.iso}/>
                        </div>
                        : <div>nothing saved</div>
                }
                <Spacer/>
                <SaveBtn onClick={() => saveList()}/>
                <Spacer/>
                <ClearBtn onClick={() => clearList()}/>
            </div>
        </>
    );
};
// endregion SaveInfos

// region History
export const TimelineLast = () => {
        // noinspection JSXNamespaceValidation
        return (
            <>
                <Separator>
                    <a style={separator} href="#">load more history</a>
                </Separator>
                <Timeline/>
            </>
        );
    }
;
// endregion History

// region Today
export const TimelineList = () => {
        const [getStore, dispatch] = state;
        const [self, setSelf] = createState({entries: []});
        // noinspection JSXNamespaceValidation,JSCheckFunctionSignatures
        return (
            <>
                <SaveInfos/>
                <EmptySeparator/>
                <Timeline/>
                <EmptySeparator/>
                {
                    self.entries.length > 0
                    && <>
                        <label style={{'padding-inline-start': '1em'}}>New Record(s):</label>
                        <div style={{...flexContainer.marginRight, margin: '0 1em 0 1em'}}>
                            <ul style={{'padding-inline-start': '1em', width: '100%'}}>
                                {
                                    self.entries.map((r, i) =>
                                        i % 2 === 0
                                            ? <div style={flexContainer.spaceBetween} className="odd">
                                                <li style={listStyle}>
                                                    <Record record={r}
                                                            balanceEditable={r.balanceEditable}
                                                            accountEditable={r.accountEditable}/>
                                                </li>
                                            </div>
                                            : <div style={flexContainer.spaceBetween} className="even">
                                                <li style={listStyle}>
                                                    <Record record={r}
                                                            balanceEditable={r.balanceEditable}
                                                            accountEditable={r.accountEditable}/>
                                                </li>
                                            </div>)
                                }
                            </ul>
                        </div>
                        <div style={{...flexContainer.marginRight, 'justify-content': 'flex-end'}}>
                            <SaveBtn onClick={() => {
                                alert('save')
                            }}/>
                            <Spacer/>
                            <ClearBtn onClick={() => setSelf('entries', e => [])}/>
                        </div>
                    </>
                }
                <div style={flexContainer}>
                    <AddBtn text="Add record" onClick={() => {
                        console.log("add record");
                        const newRecord = {
                            id: nanoid(),
                            timestamp: new Date().toISOString(),
                            balance: 0.0,
                            account: 'account',
                            currency: 'EUR',
                            isBank: true,
                            isStock: false,
                            accountEditable: true,
                            balanceEditable: true
                        };
                        // noinspection JSCheckFunctionSignatures
                        setSelf('entries', e => [...e, newRecord]);
                    }}/>
                    <Spacer/>
                    <AddBtn text="Add day" onClick={() => {
                        console.log("add day");

                    }}/>
                    <Spacer/>
                    <DownloadBtn onClick={() => exportFunc()}/>
                </div>
            </>
        );
    }
;
// endregion Today