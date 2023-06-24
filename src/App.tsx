import React from 'react';
import './App.scss';
import {NavText} from "./components/nav-text/nav-text";
import {MainDisplay} from "./components/main-display/main-display";
import {Charts} from "./components/charts/alcohol-chart";
import useWindowSize from "./hooks/windowSizeHook/window-sixe";

// Util function for alert error
export const AlertError = (message:string) => {
    return alert(message)
}

function App() {

    let {width} = useWindowSize()

  return (
    <div className={width && width >= 1750 ? '---main-layout' : '---main-layout ---main-mobile'}>
        <NavText />
        <MainDisplay />
        <Charts />
    </div>
  );
}

export default App;
