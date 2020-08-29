import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import { HashRouter } from 'react-router-dom'
import './index.css'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru'
import en from './locales/en'

i18n.use(initReactI18next).init({ resources: { ru, en }, lng: 'ru' })

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
