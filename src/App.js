import {Content, FixedHeader, FixedSideMenu, FixedSideMenuContent} from "./components/Layout.js";
import {TimelineList} from "./components/Timeline";
import {createMemo, createSignal, onCleanup, onMount} from "solid-js";
import {reducer} from "./state/reducer";
import {Actions} from "./state/actions";
import {SavePlaceholder, Spacer} from "./components/Placeholders";
import {saveList} from "./state/functions";
import {HBtn} from "./components/btn/HBtn";
import {DEFAULT, isDarkMode} from "./components/Color";
import './vars.css';

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

    document.body.style.backgroundColor = DEFAULT.background;

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
                <Spacer/>
                <HBtn text="text"/>
                <HBtn text="text" primary/>
                <HBtn text="text" secondary/>
                <HBtn text="text" secondary disabled/>
                <Spacer/>
                <HBtn primary href="https://finance.hartmann.co.com">
                    <label><SavePlaceholder/>Finance</label>
                </HBtn>
                <HBtn secondary href="https://finance.hartmann.co.com">
                    <label><SavePlaceholder/>Finance</label>
                </HBtn>
                <HBtn primary disabled href="https://finance.hartmann.co.com">
                    <label><SavePlaceholder/>Finance</label>
                </HBtn>
                <Spacer/>
                <HBtn text="hello" outlined/>
                <HBtn text="test" outlined primary/>
                <HBtn text="test" outlined primary contained/>
                <HBtn text="test" outlined secondary/>
                <HBtn text="test" outlined secondary contained/>
                <Spacer/>
                <HBtn text="hello" outlined disabled/>
                <HBtn text="test" outlined primary disabled/>
                <HBtn text="test" outlined primary contained disabled/>
                <HBtn text="test" outlined secondary disabled/>
                <HBtn text="test" outlined secondary contained disabled/>
                <Spacer/>
                <HBtn outlined><span>value</span></HBtn>
                <HBtn outlined primary>
                    <label><SavePlaceholder/>save</label>
                </HBtn>
                <HBtn outlined primary contained>
                    <label><SavePlaceholder/>save</label>
                </HBtn>
                <HBtn outlined secondary>
                    <label><SavePlaceholder/>save</label>
                </HBtn>
                <HBtn outlined secondary contained>
                    <label><SavePlaceholder/>save</label>
                </HBtn>
                <Spacer/>
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
}

export default App;
