import React, {useState, useEffect} from 'react'
import './css/App.css'
import Field from './components/Field'
import PlayerMenu from './components/playermenu-components/PlayerMenu';
import TradeMenu from './components/trade-components/TradeMenu';
import {Provider} from 'react-redux'
import store  from  './store/index'
// import pokemon from "./assets/pkmn.json";

function App() {
  return (
    <Provider store={store}>
      <section className="app-sec">
        <PlayerMenu />
        <Field />
        <TradeMenu />
      </section>
    </Provider>
  );
}

export default App;
