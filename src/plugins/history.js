export default function historyPlugin(store) {
    if (typeof window === 'undefined') {
        return;
    }

    let prevState = store.getState();

    store.subscribe(state => {
        prevState = state;
    });
}
