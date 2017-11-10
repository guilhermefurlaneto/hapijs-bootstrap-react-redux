import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,
  Col,
  ControlLabel,
  FormGroup, Row } from 'react-bootstrap';
import { actionsCreator } from '../../reducers/user';

class Login extends Component {

  onLogin(event) {
    event.preventDefault();
    event.stopPropagation();

    const payload = {
      email : this.refs.email.value,
      password : this.refs.password.value,
    };

    return this.props.dispatch(actionsCreator.login(payload));
  }

  renderErrors() {
    return this.props.user.errors.length
    ? (
      <div className='alert alert-danger'>
        <ul className='list-unstyled'>
          {
            this.props.user.errors.map((error, idx) => {
              return (<li key={idx}><p>{error}</p></li>);
            })
          }
        </ul>
      </div>
    ) : null
  }

  render() {
    return (
      <Row>
        <Col md={4} mdOffset={4}>
          <form className='panel panel-default login-form' onSubmit={this.onLogin.bind(this)}>
            <div className='panel-heading'>
              Login
            </div>
            <div className='panel-body'>
              <FormGroup>
                <ControlLabel>Email:</ControlLabel>
                <input key='email'
                       name='email'
                       ref='email'
                       type='text'
                       className='form-control'
                       defaultValue=''
                       placeholder='Email' />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password:</ControlLabel>
                <input key='password'
                       name='password'
                       ref='password'
                       type='password'
                       className='form-control'
                       defaultValue=''
                       placeholder='Senha' />
              </FormGroup>
              {this.renderErrors()}
              <FormGroup className='text-right'>
                <Button type='submit' bsStyle="primary">Entrar</Button>
              </FormGroup>
            </div>
          </form>
        </Col>
      </Row>
    );
  }
}

export default connect((store) => {
  return {
    app : store.app,
    user : store.user,
  };
})(Login);
