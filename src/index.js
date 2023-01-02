import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-datepicker/dist/react-datepicker.css'
import './assets/styles/datepicker.scss'
import './assets/styles/swiper.scss'
import './assets/styles/general.scss'
import { App } from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import "./services/i18n";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

if(process.env.REACT_APP_SENTRY_URL)
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_URL,
        integrations: [new BrowserTracing()],
    
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
)
