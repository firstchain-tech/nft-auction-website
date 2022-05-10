import React from 'react'
import ReactDOM from 'react-dom'
import './utils/i18n'
import store from './store'
import App from './App'
import './App.less'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { ThemeProvider } from './theme/index'
// HashRouter BrowserRouter
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
