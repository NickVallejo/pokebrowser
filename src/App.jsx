import React, {useState, useEffect} from 'react'
import './css/App.css'
import Field from './components/Field'
import PlayerMenu from './components/playermenu-components/PlayerMenu';
// import pokemon from "./assets/pkmn.json";

function App() {
  // useEffect(() => {
  //   console.log(pokemon[5])
  // }, [])

  return (
    <div className="pb-god">
      <PlayerMenu />
      <Field />
    </div>
  );
}

export default App;
