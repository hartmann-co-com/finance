import {Actions} from "./actions";
import {state} from "../App";

export const saveList = () => {
    const [getStore, dispatch] = state;

    dispatch({type: Actions.list.saving, payload: true});

    localStorage.setItem("store.list", JSON.stringify(getStore().list));
    let varIso = getStore().save.iso;

    if (!varIso || varIso.getTime() <= new Date().getTime()) {
        varIso = new Date();
    }
    dispatch({type: Actions.list.iso, payload: varIso});
    localStorage.setItem("store.list.iso", varIso.toISOString());

    setTimeout(() => dispatch({type: Actions.list.saving, payload: false}), 1500);
};

export const clearList = () => {
    const [getStore, dispatch] = state;

    localStorage.setItem("store.list", JSON.stringify([]));
    localStorage.setItem("store.list.iso", null);
    dispatch({type: Actions.list.iso, payload: null});
    dispatch({type: Actions.list.load, payload: []});
}