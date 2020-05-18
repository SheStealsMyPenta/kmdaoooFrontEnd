import React, { Component } from 'react'
import { HashRouter, Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import MyRouter from "./components/MyRouter"
import Prps from "./components/PrpsChart"
export default class App extends Component {
  
    render() {
        return (
            <HashRouter >
              <MyRouter></MyRouter>
            </HashRouter>
            // <Prps></Prps>
        )
    }
}
