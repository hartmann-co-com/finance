import parse from 'csv-parse/lib/sync';
import {Actions} from "../state/actions";
import {state} from "../App";
import {nanoid} from "nanoid";

const parserOptions = {
    delimiter: ';',
    skip_lines_with_error: true,
    columns: true
}

//region import
export const processText = (text) => {
    const [getStore, dispatch] = state;

    if (text && text.length > 0) {
        const result = parse(text, parserOptions);
        console.table(result);
        if (result.length > 0) {
            const list = [];
            const recordSet = new Set();
            const records = [];
            const accounts = [];
            const bankAccounts = new Set();
            const stockAccounts = new Set();
            result.forEach((v, i) => {
                const date = new Date(v.timestamp);
                let year = list.find(y => y.year === date.getUTCFullYear());

                if (!year) {
                    year = {
                        year: date.getUTCFullYear(),
                        months: [],
                        balance: 0,
                        currency: 'EUR',
                        expanded: false
                    };
                    list.push(year);
                }

                let month = year.months.find(m => m.month === date.getUTCMonth());

                if (!month) {
                    month = {
                        month: date.getUTCMonth(),
                        days: [],
                        balance: 0,
                        currency: 'EUR',
                        expanded: false
                    }
                    year.months.push(month);
                }

                let day = month.days.find(d => d.day === date.getUTCDate());

                if (!day) {
                    day = {
                        day: date.getUTCDate(),
                        records: [],
                        balance: 0,
                        currency: 'EUR',
                        expanded: false
                    }
                    month.days.push(day);
                }

                let record = day.records.find(r => r.id === v.id);

                if (!record) {
                    record = {
                        id: v.id ? v.id : nanoid(),
                        timestamp: v.timestamp,
                        balance: v.balance,
                        account: v.account,
                        currency: 'EUR',
                        isBank: v.isBank,
                        isStock: v.isStock
                    };
                    day.records.push(record);
                    const key = v.timestamp + '_' + v.account;
                    if (!recordSet.has(key)) {
                        day.balance += +v.balance;
                        recordSet.add(key);
                        records.push(record);
                    }
                }

                if (v.isBank) {
                    bankAccounts.add(v.account);
                }

                if (v.isStock) {
                    stockAccounts.add(v.account);
                }

                if (!accounts.includes(v.account)) {
                    accounts.push(v.account);
                }
            });

            list.forEach(y => {
                y.months.forEach(m => {
                    const mSum = m.days.reduce((p, c) => p + c.balance, 0);
                    m.balance = mSum / m.days.length;
                });
                const ySum = y.months.reduce((p, c) => p + c.balance, 0);
                y.balance = ySum / y.months.length;
            })

            console.table(list);
            console.table(list[0].months);
            console.table(list[0].months[0].days);
            console.table(records);
            dispatch({type: Actions.list.load, payload: list});
            dispatch({type: Actions.records, payload: records});
            dispatch({type: Actions.accounts, payload: accounts});
            dispatch({});
        }

    }
}

export const importFunc = (event) => {
    if (event && event.target && event.target.files && event.target.files.length > 0) {
        const file = event.target.files.item(0);
        const reader = new FileReader();
        reader.onload = (e) => {
            processText(reader.result);
        };
        reader.readAsText(file);
    }
}
//endregion import

//region export
export const exportFunc = () => {
    const [getStore, dispatch] = state;
    const now = new Date();
    const dateAsString = `${now.toLocaleDateString()}_${now.toLocaleTimeString()}`;

    downloadCSV({
        filenameArg: `records_${dateAsString}.csv`,
        columnsArg: ['timestamp', 'account', 'balance', 'isBank', 'isStock'],
        dataArg: getStore().records
    });
};

const downloadCSV = ({filenameArg, columnsArg, dataArg}) => {
    const now = new Date();
    const dateAsString = `${now.toLocaleDateString()}_${now.toLocaleTimeString()}`;

    let filename = filenameArg || `export_${dateAsString}.csv`;
    let columns = columnsArg || null;

    if (dataArg == null || dataArg.length <= 0) return;

    let csv = null;

    if (columnsArg != null && columnsArg.length > 0) {
        csv = columnsArg.join(';') + '\n';
        console.log('columns: ' + csv);
    }

    csv += dataArg.map(r => `${r.timestamp};${r.account};${r.balance};${r.isBank};${r.isStock}`)
        .join('\n');

    console.log('csv: ' + csv);

    if (csv == null) return;

    const blob = new Blob([csv]);
    if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        window.navigator.msSaveBlob(blob, filename);
    else
    {
        const a = window.document.createElement("a");
        // a.href = window.URL.createObjectURL(blob, {type: "text/plain"}); //old definition
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        document.body.removeChild(a);
    }

};
//endregion export