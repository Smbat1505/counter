import React from 'react';
import './App.css';
import Counter from "./components/Counter";
import CounterWithRedux from "./components/CounterWithRedux";

function App() {
    return (
        <div className={"App"}>
            <div className="theme">
                <span className="material-symbols-outlined">dark_mode</span>
            </div>
            <CounterWithRedux/>
        </div>

    )
}

export default App;