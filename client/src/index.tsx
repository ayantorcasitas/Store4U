import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
//import ReactDOM from "react-dom/client";


import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { Router } from 'react-router-dom';
import { StoreProvider } from './app/context/StoreContext';

export const history = createBrowserHistory();

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// //root.render(<h1>Hello, world!</h1>);

// root.render(
//   <React.StrictMode>
//     <Router history={history}>
//         <App />
//     </Router>
//   </React.StrictMode>
// );

// var rootElem = document.getElementById("root") as HTMLElement;
// debugger;
// const root = ReactDOM.createRoot(rootElem);
// root.render(
//   <React.StrictMode>
//     <Router history={history}>
//       {/* <StoreProvider>
//         <App />
//       </StoreProvider> */}
//       <App />
//     </Router>
//   </React.StrictMode>
// );


ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//       <BrowserRouter>
//         <App/>
//       </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <>
//     <BrowserRouter history={history}>
//       <App />
//     </BrowserRouter>
//   </>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
