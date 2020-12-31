import {Actions} from "./actions";

export const reducer = (state, action = {}) => {
    switch (action.type) {
        case Actions.init:
            return action.payload;
        //region list
        case Actions.list.add:
            return {...state, list: [...state.list, action.payload]};
        case Actions.list.remove:
            return {...state, list: state.list.filter(el => el.id === action.payload.id)}
        case Actions.list.load: {
            return {...state, list: action.payload};
        }
        case Actions.list.iso: {
            return {...state, save: {...state.save, iso: action.payload}};
        }
        case Actions.list.saving: {
            return {...state, save: {...state.save, saving: action.payload}};
        }
        case Actions.list.update.year: {
            return {...state, list: state.list
                    .filter((v, i) => i !== action.payload.index)
                    .concat([action.payload.value])};
        }
        case Actions.list.update.month: {
            console.dir(state);
            let changed = {...state};
            changed.list.find(y => y.year === action.payload.year)
                .months
                .splice(action.payload.index, 1, action.payload.value);
            console.dir(changed);
            return changed;
        }
        case Actions.list.update.day: {
            let changed = {...state};
            changed.list.find(y => y.year === action.payload.year)
                .months
                .find(m => m.month === action.payload.month)
                .days
                .splice(action.payload.index, 1, action.payload.value);
            return changed;
        }
        //endregion list

        //region records
        case Actions.records: {
            return {...state, records: action.payload};
        }
        case Actions.record: {
            const record = action.payload.value;
            const date = new Date(record.timestamp);
            const result = {
                ...state,
                records: [...state.records].filter(r => r.id !== record.id).concat([record])
            }
            result.list.find(y => y.year === date.getUTCFullYear())
                .months
                .find(m => m.month === date.getUTCMonth())
                .days
                .find(d => d.day === date.getUTCDate())
                .records
                .splice(action.payload.index, 1, record);

            debugger;
            return result;
        }
        //endregion records

        //region accounts
        case Actions.accounts: {
            return {...state, accounts: action.payload};
        }
        //endregion accounts

        //region bankAccounts
        case Actions.bankAccounts: {
            return {...state, bankAccounts: action.payload};
        }
        //endregion bankAccounts

        //region stockAccounts
        case Actions.stockAccounts: {
            return {...state, stockAccounts: action.payload};
        }
        //endregion stockAccounts

        //region timer
        case Actions.timer: {
            return {...state, timer: action.payload};
        }
        //endregion timer

        //region side-menu
        case Actions.sideMenu: {
            return {...state, displaySideMenu: action.payload};
        }
        //endregion side-menu
        default:
            return state;
    }
};