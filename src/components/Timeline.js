// region common
import {state} from "../App";
import {EmptySeparator, separator, Separator} from "./separator/Separator";
import {
    AddPlaceholder,
    ArrowDownPlaceholder,
    ArrowRightPlaceholder,
    ClearPlaceholder,
    DownloadPlaceholder,
    SavePlaceholder,
    Spacer,
    Spinner,
    UploadPlaceholder
} from "./Placeholders";
import {flexContainer} from "../flex";
import {ClearBtn, SaveBtn} from "./Button";
import {exportFunc, importFunc} from "../csv/csv";
import {DisplayDate, MONTHS} from "./DateTime";
import {createState} from "solid-js";
import {Actions} from "../state/actions";
import {clearList, saveList} from "../state/functions";
import {nanoid} from "nanoid";
import {Number} from "./Number";
import {HBtn} from "./btn/HBtn";
import {isDarkMode} from "./Color";

const listStyle = {'list-style-type': 'decimal', width: '100%'};

const listStyleNone = {...listStyle, 'list-style-type': 'none'};

const Timeline = () => {
    const [getStore] = state;
    const cssOdd = ['odd'];
    const cssEven = ['even'];
    if (isDarkMode()) {
        cssOdd.push('h-dark');
        cssEven.push('h-dark');
    } else {
        cssOdd.push('h-white');
        cssEven.push('h-white');
    }
    const summaryNumber = getStore().list && getStore().list.length > 0 ? getStore().list[getStore().list.length - 1].balance : 0;
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
                                        ? <div style={flexContainer.marginRight} className={cssOdd.join(' ')}>
                                            <li style={listStyleNone}>
                                                <Year year={y} index={i}/>
                                            </li>
                                        </div>
                                        : <div style={flexContainer.marginRight} className={cssEven.join(' ')}>
                                            <li style={listStyleNone}>
                                                <Year year={y} index={i}/>
                                            </li>
                                        </div>
                                }
                            </ul>
                        )
                    : <>
                        <div style={flexContainer.noPadding} className="padding-inline-start">
                            <HBtn disabled>
                                <label>no entries</label>
                            </HBtn>
                            <Spacer/>
                            <HBtn outlined primary>
                                <label>
                                    <UploadPlaceholder/>import
                                    <input onClick={event => importFunc(event)}
                                           style={{display: 'none'}}
                                           type="file"/>
                                </label>
                            </HBtn>
                        </div>
                    </>
            }
            <EmptySeparator/>
            <div style={{'padding-inline-start': '1em'}}>
                <div style={flexContainer.marginRight}>
                    <label style={{margin: '0 0 0 1em'}}>
                        <HBtn><label>Summary</label></HBtn>
                    </label>
                    <label style={{margin: '0 2em 0 0', "padding-right": '2em'}}>
                        <HBtn><Number decimal={summaryNumber}/></HBtn>
                    </label>
                </div>
            </div>
        </>
    );
};

const Year = ({year, index}) => {
    const [self, setSelf] = createState({expanded: year.expanded});
    // noinspection JSUnusedLocalSymbols
    const [getStore, dispatch] = state;
    // noinspection JSCheckFunctionSignatures, JSXNamespaceValidation
    return (
        <>
            <div style={flexContainer.spaceBetween}>
                <div style={{...flexContainer.noPadding, padding: '1em 0 1em 1em'}}>
                    <HBtn onClick={() => {
                        // noinspection JSCheckFunctionSignatures
                        setSelf('expanded', ex => !ex);
                        year.expanded = self.expanded;
                        dispatch({type: Actions.list.update.year, payload: {index: index, value: year}});
                    }}>
                        <label>
                            {self.expanded === false && <ArrowRightPlaceholder/>}
                            {self.expanded === true && <ArrowDownPlaceholder/>}
                            {year.year}
                        </label>
                    </HBtn>
                </div>


                <label style={{margin: '0 1.5em 0 0', "padding-right": '1.5em'}}>
                    <HBtn>
                        <Number decimal={year.balance}/>
                    </HBtn>
                </label>
            </div>
            {self.expanded === true && <Months values={year.months} year={year.year}/>}
        </>
    );
};

const Month = ({month, year, index}) => {
    const [self, setSelf] = createState({expanded: month.expanded});
    // noinspection JSUnusedLocalSymbols
    const [getStore, dispatch] = state;
    // noinspection JSXNamespaceValidation,JSCheckFunctionSignatures
    return (
        <>
            <div style={flexContainer.spaceBetween}>
                <div style={{...flexContainer.noPadding, padding: '1em 0 1em 1em'}}>
                    <HBtn onClick={() => {
                        // noinspection JSCheckFunctionSignatures
                        setSelf('expanded', ex => !ex);
                        month.expanded = self.expanded;
                        dispatch({
                            type: Actions.list.update.month,
                            payload: {index: index, year: year, value: {...month}}
                        });
                    }}>
                        <label>
                            {self.expanded === false && <ArrowRightPlaceholder/>}
                            {self.expanded === true && <ArrowDownPlaceholder/>}
                            {MONTHS[month.month]}
                        </label>
                    </HBtn>

                </div>
                <label style={{margin: '0 1em 0 0', "padding-right": '1.5em'}}>
                    <HBtn>
                        <Number decimal={month.balance}/>
                    </HBtn>
                </label>
            </div>
            {self.expanded === true && <Days values={month.days} year={year} month={month.month}/>}
        </>
    );
};

const Months = ({values, year}) => {
    const cssOdd = ['odd'];
    const cssEven = ['even'];
    if (isDarkMode()) {
        cssOdd.push('h-dark');
        cssEven.push('h-dark');
    } else {
        cssOdd.push('h-white');
        cssEven.push('h-white');
    }
    return (
        <>
            {
                values.length > 0
                    ? values.map((m, i) => <ul style={{'padding-inline-start': '1em'}}>
                        {
                            i % 2 === 0
                                ? <div style={flexContainer.spaceBetween} className={cssOdd.join(' ')}>
                                    <li style={listStyleNone}>
                                        <Month month={m} year={year} index={i}/>
                                    </li>
                                </div>
                                : <div style={flexContainer.spaceBetween} className={cssEven.join(' ')}>
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
    const cssOdd = ['odd'];
    const cssEven = ['even'];
    if (isDarkMode()) {
        cssOdd.push('h-dark');
        cssEven.push('h-dark');
    } else {
        cssOdd.push('h-white');
        cssEven.push('h-white');
    }
    return (
        <>
            {
                values.length > 0
                    ? values.map((d, i) => <ul style={{'padding-inline-start': '1em'}}>
                        {
                            i % 2 === 0
                                ? <div style={flexContainer.spaceBetween} className={cssOdd.join(' ')}>
                                    <li style={listStyleNone}>
                                        <Day day={d} year={year} month={month} index={i}/>
                                    </li>
                                </div>
                                : <div style={flexContainer.spaceBetween} className={cssEven.join(' ')}>
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
    // noinspection JSUnusedLocalSymbols
    const [getStore, dispatch] = state;
    // noinspection JSXNamespaceValidation,JSCheckFunctionSignatures
    return (
        <>
            <div style={flexContainer.spaceBetween}>
                <div style={{...flexContainer.noPadding, padding: '1em 0 1em 1em'}}>
                    <HBtn onClick={() => {
                        // noinspection JSCheckFunctionSignatures
                        setSelf('expanded', ex => !ex);
                        day.expanded = self.expanded;
                        dispatch({
                            type: Actions.list.update.day,
                            payload: {index: index, year: year, month: month, value: {...day}}
                        });
                    }}>
                        <label>
                            {self.expanded === false && <ArrowRightPlaceholder/>}
                            {self.expanded === true && <ArrowDownPlaceholder/>}
                            Day {day.day}
                        </label>
                    </HBtn>
                </div>
                <label style={{margin: '0 1em 0 0', "padding-right": '1em'}}>
                    <HBtn>
                        <Number decimal={day.balance}/>
                    </HBtn>
                </label>
            </div>
            {self.expanded === true && <Records values={day.records} dispatch={true}/>}
        </>
    );
};

const Records = ({values, dispatch}) => {
    const cssOdd = ['odd', 'record'];
    const cssEven = ['even', 'record'];
    if (isDarkMode()) {
        cssOdd.push('h-dark');
        cssEven.push('h-dark');
    } else {
        cssOdd.push('h-white');
        cssEven.push('h-white');
    }
    // noinspection JSXNamespaceValidation
    return (
        <>
            <ul style={{'padding-inline-start': '1em'}}>
                {
                    values.length > 0
                        ? values.map((r, i) =>
                            i % 2 === 0
                                ? <div style={flexContainer.spaceBetween} className={cssOdd.join(' ')}>
                                    <li style={{...listStyleNone, margin: '0 0.5em 0 0.5em'}}>
                                        <Record record={r} index={i} dispatchEnabled={dispatch}/>
                                    </li>
                                </div>
                                : <div style={flexContainer.spaceBetween} className={cssEven.join(' ')}>
                                    <li style={{...listStyleNone, margin: '0 0.5em 0 0.5em'}}>
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
    // noinspection JSUnusedLocalSymbols
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
    // noinspection JSUnusedLocalSymbols
    const small = {
        'font-size': 'x-small'
    }
    // noinspection JSXNamespaceValidation,JSCheckFunctionSignatures
    return (
        <>
            <div style={{display: 'grid', 'grid-template-columns': '50% 50%', padding: '0.25em 0 0.25em 0'}}>
                <div style={{...flexStyle}}>
                    <DisplayDate date={() => date} small/>
                    {accountEditable
                        ? <input type="text" onChange={event => record.account = event.target.value}
                                 value={record.account}/>
                        : <label>
                            {record.account}
                        </label>
                    }
                </div>
                <label style={{margin: '0 1em 0 0', 'flex-grow': 3, "text-align": 'right'}}>
                    <HBtn>
                        <Number decimal={record.balance} onChange={event => record.balance = event.target.value}
                                editable={balanceEditable}/>
                    </HBtn>
                </label>
            </div>
            {
                record.showOptions === true
                    ? <div style={{display: 'grid', 'grid-template-columns': '100%', padding: '0.25em 0 0.25em 0'}}>
                        <Separator><a onClick={() => {
                            dispatch({
                                type: Actions.record,
                                payload: {index: index, value: {...record, showOptions: !record.showOptions}}
                            });
                        }} style={{cursor: 'pointer'}}>less</a></Separator>
                        <div style={{...flexStyle}}>
                            <label style={{color: '#878787', padding: '0.25em'}}>Options</label>
                            <div style={{...flexStyle}}>
                                <div style={{...flexEndStyle, 'text-align': 'left'}}>
                                    {
                                        record.isBank === true
                                            ? <input type="checkbox" id={`isBank_${record.id}`}
                                                     disabled={true}
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
                                                     disabled={true}
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
                                                     disabled={true}
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
                                                     disabled={true}
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
                    </div>
                    : <Separator><a onClick={() => {
                        dispatch({
                            type: Actions.record,
                            payload: {index: index, value: {...record, showOptions: !record.showOptions}}
                        });
                    }} style={{cursor: 'pointer'}}>more</a></Separator>
            }
        </>
    );
}

const NewRecord = ({record, accountEditable = false, balanceEditable = false, index, dispatchEnabled = false}) => {
    // noinspection JSUnusedLocalSymbols
    const [getStore, dispatch] = state;
    const date = record.timestamp ? new Date(record.timestamp) : new Date();

    const flexStyle = {
        ...flexContainer.noPadding,
        'flex-direction': 'column',
        'align-items': 'flex-start'
    };
    let textRight = {'text-align': 'right'};
    let textLeft = {'text-align': 'left'};
    const flexEndStyle = {
        ...flexContainer.noPadding,
        'align-items': 'flex-end',
        'margin-left': '2em'
    }
    let optionGridColumns = {'grid-template-columns': '50% 50%'};
    if (window.innerWidth < 450) {
        console.log(window.innerWidth);
        optionGridColumns = {'grid-template-columns': '100%'};
    }
    // noinspection JSXNamespaceValidation,JSCheckFunctionSignatures
    return (
        <>
            <div style={{
                display: 'grid',
                'grid-template-columns': 'calc(50% - 0.5em) calc(50% - 0.5em)',
                padding: '0.25em 0 0.25em 0',
                'grid-gap': '1em'
            }}>
                <label style={{...textRight}}>Date:</label>
                <label><DisplayDate date={() => date} small/></label>

                <label style={{...textRight}}>Balance:</label>
                <label style={{...textLeft, margin: '0 1em 0 0'}}>
                    <Number decimal={record.balance} onChange={event => record.balance = event.target.value}
                            editable={balanceEditable}/>
                </label>
            </div>
            <div style={{display: 'grid', 'grid-template-columns': '100%', padding: '0.25em 0 0.25em 0'}}>
                <div style={{...flexStyle}}>
                    <Separator><label style={{color: '#878787', padding: '0.25em'}}>Options</label></Separator>
                    <div style={{display: 'grid', width: '100%', ...optionGridColumns}}>
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
                            <Spacer half={true}/>
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
                            <Spacer half={true}/>
                            <label for={`ìsStock_${record.id}`}>is stock</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
// endregion common

// region SaveInfos
export const SaveInfos = () => {
    const [getStore] = state;
    // noinspection JSXNamespaceValidation
    return (
        <>
            <div style={flexContainer.end}>
                {getStore().save.saving ? <Spinner/> : null}
                <Spacer/>
                <HBtn disabled>
                    {
                        getStore().save.iso
                            ?
                            <div style={{
                                ...flexContainer.noPadding,
                                "flex-direction": 'column',
                                "align-items": 'flex-start'
                            }}>
                                <label style={{"font-size": 'x-small'}}>Last saved on:</label>
                                <DisplayDate date={() => getStore().save.iso}/>
                            </div>
                            : <div>nothing saved</div>
                    }
                </HBtn>
                <Spacer/>
                <HBtn outlined secondary onClick={() => saveList()}>
                    <label><SavePlaceholder/>save now</label>
                </HBtn>
                <HBtn outlined secondary onClick={() => clearList()}>
                    <label><ClearPlaceholder/>clear</label>
                </HBtn>
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
        // noinspection JSUnusedLocalSymbols
        const [getStore, dispatch] = state;
        const [self, setSelf] = createState({entries: []});
        // noinspection JSXNamespaceValidation,JSCheckFunctionSignatures,JSUnusedLocalSymbols
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
                                                    <NewRecord record={r}
                                                               onAccountChange={(event, id) => setSelf('entries', e => e.find(v => v.id === id))}
                                                               balanceEditable={r.balanceEditable}
                                                               accountEditable={r.accountEditable}/>
                                                </li>
                                            </div>
                                            : <div style={flexContainer.spaceBetween} className="even">
                                                <li style={listStyle}>
                                                    <NewRecord record={r}
                                                               balanceEditable={r.balanceEditable}
                                                               accountEditable={r.accountEditable}/>
                                                </li>
                                            </div>)
                                }
                            </ul>
                        </div>
                        <div style={{...flexContainer.marginRight, 'justify-content': 'flex-end'}}>
                            <SaveBtn onClick={() => {
                                dispatch({type: Actions.list.add, payload: self.entries})
                            }}/>
                            <Spacer/>
                            <ClearBtn onClick={() => setSelf('entries', e => [])}/>
                        </div>
                    </>
                }
                <div style={flexContainer}>
                    <HBtn outlined primary onClick={() => {
                        console.log("add record");
                        const newRecord = {
                            id: nanoid(),
                            timestamp: new Date().toISOString(),
                            balance: 0.0,
                            account: '',
                            currency: 'EUR',
                            isBank: true,
                            isStock: false,
                            accountEditable: true,
                            balanceEditable: true
                        };
                        // noinspection JSCheckFunctionSignatures
                        setSelf('entries', e => [...e, newRecord]);
                    }}>
                        <label><AddPlaceholder/>add record</label>
                    </HBtn>
                    <Spacer/>
                    <HBtn outlined primary onClick={() => {
                        console.log("add day");
                    }}>
                        <label><AddPlaceholder/>add day</label>
                    </HBtn>
                    <Spacer/>
                    <HBtn outlined primary onClick={() => exportFunc()}>
                        <label><DownloadPlaceholder/>export</label>
                    </HBtn>
                </div>
            </>
        );
    }
;
// endregion Today