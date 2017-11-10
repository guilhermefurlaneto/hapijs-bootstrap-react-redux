import React, { Component } from 'react';
import { Col, Row, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class PageHeader extends Component {

  static propTypes = {
    backUrl : PropTypes.string.isRequired,
    pageTitle : PropTypes.string.isRequired,
  }

  pushBackUrl() {
    this.props.dispatch(
      push(this.props.backUrl)
    );
  }

  render() {
    return (
      <div className='page-header'>
        <div className='container-fluid'>
          <Row>
            <Col md={12}>
              <h3>
                <a onClick={this.pushBackUrl.bind(this)} className='btn btn-link'>
                  <Glyphicon glyph="chevron-left" />
                </a>
                {this.props.pageTitle}
              </h3>
            </Col>
          </Row>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    app : store.app,
  };
})(PageHeader);
