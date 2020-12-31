import {Content, FixedHeader, FixedSideMenu, FixedSideMenuContent} from "./components/Layout.js";
import {TimelineList} from "./components/Timeline";
import {createMemo, createSignal, onCleanup, onMount} from "solid-js";
import {reducer} from "./state/reducer";
import {Actions} from "./state/actions";
import {Spacer} from "./components/Placeholders";
import {saveList} from "./state/functions";

const stateObject = {
    list: [],
    save: {
        interval: 60_000,
        iso: null,
        saving: false
    },
    timer: null,
    displaySideMenu: false,
    records: [],
    minWidth: 450,
    accounts: [],
    bankAccounts: new Set(),
    stockAccounts: new Set()
};
// redux
const [getAction, dispatch] = createSignal(),
    getStore = createMemo(state => reducer(state, getAction()));

export const state = [getStore, dispatch];

function App() {
    //initialize store with default stateObject
    dispatch({type: Actions.init, payload: stateObject});

    //check for saved store-value "list" - not working in "onMount"!
    const parsed = JSON.parse(localStorage.getItem("store.list"));
    if (parsed && parsed.length > 0) {
        dispatch({type: Actions.list.load, payload: parsed});
    }
    let loadedIso = localStorage.getItem("store.list.iso");
    if (loadedIso === 'undefined' || loadedIso === 'null') {
        //nothing to do
    } else {
        const iso = new Date(loadedIso);
        if (iso) {
            dispatch({type: Actions.list.iso, payload: iso});
        }
    }

    onMount(() => {
        //set app-interval
        const timer = setInterval(() => saveList(), getStore().save.interval);

        //save timer in store
        dispatch({type: Actions.timer, payload: timer});
    });

    onCleanup(() => clearInterval(getStore().timer));

    // noinspection JSXNamespaceValidation
    return (
        <>
            <FixedHeader/>

            <Content>
                {
                    getStore().displaySideMenu
                        ? <FixedSideMenu><FixedSideMenuContent/></FixedSideMenu>
                        : null
                }
                <Spacer/>
                <TimelineList/>
            </Content>
        </>
    );
};

export default App;
