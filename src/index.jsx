import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from './store'; // Import the store you configured
import ThemeProvider from './utils/ThemeContext';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
