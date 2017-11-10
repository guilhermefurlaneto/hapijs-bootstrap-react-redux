import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, ControlLabel, FormGroup, Row } from 'react-bootstrap';
import SetPasswordForm from './Set-Password-Form';
import { actionsCreator } from '../../reducers/user';

class SignUp extends Component {

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const payload = {
      email : this.refs.email.value,
      name : this.refs.name.value,
      ...this.refs.setPasswordForm.getValues(),
    };

    this.props.dispatch(
      actionsCreator.signUp(payload)
    );
  }

  render() {
    return (
      <Row>
        <Col md={4} mdOffset={4}>
          <form className='panel panel-default login-form'
                onSubmit={this.onSubmit.bind(this)}>

            <div className='panel-heading'>
              Registrar-se
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
                <ControlLabel>Nome:</ControlLabel>
                <input key='name'
                       name='name'
                       ref='name'
                       type='text'
                       className='form-control'
                       defaultValue=''
                       placeholder='Nome' />
              </FormGroup>
              <SetPasswordForm ref='setPasswordForm' />

              <FormGroup className='text-right'>
                <Button type='submit' bsStyle='primary'>Salvar</Button>
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
})(SignUp);
