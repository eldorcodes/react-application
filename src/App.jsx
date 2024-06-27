import React from 'react';
import Application from './components/Application';
import { Store } from './redux/Store';
import { Provider } from 'react-redux';
import firebase from '../src/firebase';
import './App.css';
import Applicants from './components/Applicants';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Provider store={Store}>
        <Application/>
      </Provider>,
    },
    {
      path: "applicants",
      element: <Applicants />,
    },
  ]);

  

  return (
   <RouterProvider router={router} />
  )
}
