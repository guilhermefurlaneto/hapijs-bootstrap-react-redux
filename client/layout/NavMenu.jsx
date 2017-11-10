import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Glyphicon, NavItem, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { actionsCreator } from '../reducers/user'

class NavMenu extends Component {

  goTo(location) {
    this.props.dispatch(push(location));
  }

  signOut() {
    this.props.dispatch(actionsCreator.signOut());
  }

  renderUnloggedUserMenu() {
    return [
      <NavItem key='home' eventKey={1} onClick={this.goTo.bind(this, '/')}>
          <Glyphicon glyph="home" /> Home
      </NavItem>,
      <NavItem key='login' eventKey={3} onClick={this.goTo.bind(this, '/login')}>
          <Glyphicon glyph="log-in" /> Login
      </NavItem>,
      <NavItem key='pasword-recovery' eventKey={3} onClick={this.goTo.bind(this, '/password-recovery')}>
          <Glyphicon glyph="log-in" /> Recuperar Senha
      </NavItem>
    ];
  }

  renderLoggedUserMenu() {
    return [
      <NavItem key='sign-out' eventKey={1} onClick={this.signOut.bind(this)}>
          <Glyphicon glyph="home" /> Sign Out
      </NavItem>,
      <NavItem key='pasword-recovery' eventKey={3} onClick={this.goTo.bind(this, '/change-password')}>
          <Glyphicon glyph="log-in" /> Alterar Senha
      </NavItem>
    ];
  }

  render() {
    return (
        <div className='main-nav'>
            <Navbar inverse collapseOnSelect fluid>
                <Navbar.Header className="text-center">
                    <Navbar.Brand>
                        <Link to={ this.props.user.isLoggedIn ? '/dashboard' : '/' }>CRM</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <div className='clearfix'></div>
                <Navbar.Collapse>
                    <Nav>
                        {
                          this.props.user.isLoggedIn
                          ? this.renderLoggedUserMenu()
                          : this.renderUnloggedUserMenu()
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
  }
}

export default connect((store) => {
    return {
        app : store.app,
        user : store.user,
    };
})(NavMenu);
