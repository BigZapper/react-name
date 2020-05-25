import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddName from "./components/add-name.component";
import Name from "./components/name.component";
import NamesList from "./components/names-list.component";
import ViewNames from "./components/recomend-name.component";
import Meaning from "./components/meaning.component";
import {NavLink} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark navbar-fixed-top">
            <a href="/names" className="navbar-brand">
              Baby Name
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/names"} className="nav-link">
                  Danh sách tên
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Thêm tên
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/view"} className="nav-link">
                  Xem tên
                </Link>
              </li>
            </div>
          </nav>

          
          <div id="wrapper" className="container">
          

            <div id="sidebar-wrapper">
              <ul className="sidebar-nav">
                <li className="sidebar-brand">
                  <a href="#">Công cụ</a>
                </li>
                <li>
                <NavLink  to={"/view"} className="nav-NavLink js-scroll-trigger">
                  Xem tên theo phong thuỷ 
                </NavLink >
                </li>
                <li>
                <NavLink  to={"/names"} className="nav-NavLink js-scroll-trigger">
                  Xem tên lót hay 
                </NavLink >
                </li>
                <li>
                <NavLink  to={"/meaning"} className="nav-NavLink js-scroll-trigger">
                  Xem ý nghĩa của tên 
                </NavLink >
                </li>
              </ul>
            </div>

            <div className="container-fluid" id="page-content-wrapper">
            <Switch>
              <Route exact path={["/", "/names"]} component={NamesList} />
              <Route exact path="/add" component={AddName} />
              <Route path="/names/:id" component={Name} />
              <Route path="/view" component={ViewNames} />
              <Route path="/meaning" component={Meaning} />
            </Switch>
          </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
