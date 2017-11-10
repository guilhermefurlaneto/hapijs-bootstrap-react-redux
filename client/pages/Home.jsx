import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Home extends Component {
  componentWillMount() {
    if (this.props.user.isLoggedIn) {
      this.props.dispatch(push('/dashboard'));
    }
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <a href='/login'>Login</a>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    user : store.user,
  };
})(Home);
