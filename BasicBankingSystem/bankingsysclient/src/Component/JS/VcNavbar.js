import React from 'react';
import '../CSS/Navbar.css';
import { FaSignOutAlt, FaLanguage, FaTimes, FaUser, FaAddressBook, FaQuestionCircle, FaUserSecret, FaPiggyBank} from 'react-icons/fa';
import {Redirect} from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Button} from 'reactstrap';
import { ButtonToolbar, OverlayTrigger, Popover } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import App from '../../App'; 
import { TiArrowBack } from 'react-icons/ti';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

 class VcNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  
      isOpen: false

    };
  }

  // toggle = () => {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // }
  
  render() {


    return (
      <div>
        <Navbar color="white" light expand="md" className="navbarcolor" style={{paddingBottom: "0rem", paddingTop: "1.5rem"}}>
          <div> 
            <span className="userProfileProfileIcon" style={{marginRight:"0.5rem", marginLeft:"0.2rem"}}>Bank Of India</span>
          </div>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse navbar >
            <Nav className="ml-auto"navbar>
              <div className= "navItemToBeDisplayed">
                <NavItem className="navitem">
                  <NavLink to='/' 
                    exact
                    className="main-nav"
                    activeClassName="main-nav-active"
                  >
                    Home
                  </NavLink>
                </NavItem>
                <NavItem className="navitem">
                  <NavLink to='/customers' 
                    className="main-nav"
                    activeClassName="main-nav-active"
                  >
                    View Customers
                  </NavLink>
                </NavItem>
                <NavItem className="navitem">
                  <NavLink to='/transfer' 
                    className="main-nav"
                    activeClassName="main-nav-active"
                  >
                    Transfer Records
                  </NavLink>
                </NavItem>
              </div>  
            </Nav>
            </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default VcNavBar;
