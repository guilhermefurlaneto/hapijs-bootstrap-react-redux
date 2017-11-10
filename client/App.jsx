import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import NavMenu from './layout/NavMenu';

class App extends Component {

  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Col sm={2}>
            <NavMenu />
          </Col>
          <Col sm={10}>
            {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(connect((store) => {
  return {
    app : store.app,
    routing : store.routing,
  };
})(App));
