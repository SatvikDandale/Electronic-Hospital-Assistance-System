import React from "react";
import { NavLink } from "react-router-dom";
import "./mainNavigation.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

class mainNavigation extends React.Component{
  render(){
    return (
      <header className="main-navigation">
        <nav className="main-navigation__items">
          <div className="toolbar__toggle-button">
            <DrawerToggleButton
              click={this.props.drawerClickHandler}
            ></DrawerToggleButton>
          </div>
          <div className="main-navigation__logo">
            <h1>CarePlus</h1>
          </div>
          <div className="spacer"></div>
          <div className="main-navigation__div">
            <ul>
              <li>
                <NavLink to="/auth">Authentication</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
} 
export default mainNavigation;
