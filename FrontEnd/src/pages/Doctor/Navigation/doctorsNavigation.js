import React from "react";
import { NavLink } from 'react-router-dom'
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import "./mainNavigation.css";
class mainNavigation extends React.Component{
  render(){
    // console.log(this.props)
    return (
      <header className="doctor-main-navigation">
        <nav className="main-navigation__items">
          <div className="toolbar__toggle-button">
            <DrawerToggleButton
              click={this.props.drawerClickHandler}
            ></DrawerToggleButton>
          </div>
          <div className="main-navigation__logo">
            <h1>Care Plus</h1>
          </div>
          <div className="spacer"></div>
          <div className="main-navigation__div">
            <ul>
              <li>
                <button
                  type="button"
                  className="btn"
                  onClick={this.props.history}
                >
                  Patient History
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn"
                  onClick={this.props.diagnosis}
                >
                  Diagnosis
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn"
                  onClick={this.props.prescription}
                >
                  Prescription
                </button>
              </li>
              
              <li className='dropdown'>
                
                  <NavLink 
                    className="btn btn-logout" 
                    to="/auth"
                  ><span>{<AccountBoxIcon/>} {this.props.doctorName}</span></NavLink>
                
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
export default mainNavigation;
