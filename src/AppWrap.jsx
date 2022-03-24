import React, {useEffect} from 'react'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import { fieldMusicToggle } from './helpers/musicDJ';

function AppWrap() {

  useEffect(() => () => fieldMusicToggle(false), [])

  return (
    <Provider store={store}>
        <App />
    </Provider>
  )
}

export default AppWrap