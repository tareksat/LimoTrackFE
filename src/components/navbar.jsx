import React, {Component} from "react";
import {Navbar, Nav, NavDropdown, Image} from 'react-bootstrap';
import global from "../services/data";

export default class Top_bar extends Component {
    state = {
        fleetControl: {EN: 'Fleet control', AR: "إداره الاسطول"},
        alerts: {EN: 'alerts', AR: "الإشعارات"},
        SOS: {EN: 'SOS', AR: "استغاثه"},
        commands: {EN: 'Commands', AR: "الاوامر"},
        reports: {EN: 'Reports', AR: "التقارير"},
        logout: {EN: 'Logout', AR: "تسجيل الخروج"}
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">LimoTrack</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='/dashboard/accounts'>{this.state.fleetControl[global.language]}</Nav.Link>
                        <Nav.Link href="#ss">{this.state.alerts[global.language]}</Nav.Link>
                        <Nav.Link href="#dd">{this.state.SOS[global.language]}</Nav.Link>
                        <NavDropdown title={this.state.commands[global.language]} id="collasible-nav-dropdown">
                            <NavDropdown.Item disabled={true} href="#action/4.1">Fuel</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/4.2">Movement</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/4.3">Trip</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/4.4">Engine</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/4.5">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={this.state.reports[global.language]} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Fuel</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.2">Movement</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.3">Trip</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Engine</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.5">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav>
                        <Nav.Link href="#deets">{global.currentUser.name}</Nav.Link>
                        <Nav.Link eventKey={2} href="/login">
                            {this.state.logout[global.language]}
                        </Nav.Link>

                    </Nav>

                    <Image
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU'
                        style={{height: 50, width: 50, borderRadius: 25, marginRight: 20}}
                    />
                    <Nav>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

    }
}
