import React from 'react';
import styles from './App.module.css'
import CounterWithRedux from "./components/CounterWithRedux";

function App() {
    return (
        <div className={styles.App}>
            <CounterWithRedux/>
        </div>

    )
}

export default App;