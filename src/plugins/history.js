export default function historyPlugin(store) {
    if (typeof window === 'undefined') {
        return;
    }

    let prevState = store.getState();
    console.log(prevState);

    store.subscribe(state => {
        prevState = state;
    });
}
