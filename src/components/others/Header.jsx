import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { auth } from '../../firebase';


const cookie = new Cookies()   

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
          user: null
        };
      }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        const username = cookie.get('dataUser');
        this.setState({user:username})
    }

    onLogoutSelect = async () => {
        // this.props.onUserLogout();
        await auth().signOut()
        this.setState({user: null}); 
        cookie.remove('dataUser')
    }

    render () {
        if(this.state.user === null || this.state.user === undefined) {
            return (
                <div>
                    <Navbar style={{backgroundColor:'black'}} expand="md">
                        <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar  style={{color:'yellow'}} >
                                <NavItem>
                                    <Link to="/register"><NavLink>Register</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/login"><NavLink >Login</NavLink></Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )
        }
        return (
            <div>
                <Navbar style={{backgroundColor:'black'}} expand="md">
                    <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Hello, {this.state.user}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/cart">Cart</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/history">History</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.onLogoutSelect}>
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;