import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, ControlLabel, FormGroup, Row } from 'react-bootstrap';
import SetPasswordForm from './Set-Password-Form';
import { actionsCreator } from '../../reducers/user';

class ChangePassword extends Component {

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const passwordInfo = this.refs.setPasswordForm.getValues();

    const payload = {
      password : this.refs.password.value,
      newPassword : passwordInfo.password,
      confirmNewPassword : passwordInfo.confirmPassword,
    };

    this.props.dispatch(
      actionsCreator.changePassword(payload)
    );
  }

  render() {
    return (
      <Row>
        <Col md={4} mdOffset={4}>
          <form className='panel panel-default login-form'
                onSubmit={this.onSubmit.bind(this)}>

            <div className='panel-heading'>
              Alterar senha
            </div>

            <div className='panel-body'>
              <FormGroup>
                <ControlLabel>Senha atual:</ControlLabel>
                <input key='password'
                       name='password'
                       ref='password'
                       type='password'
                       className='form-control'
                       defaultValue=''
                       placeholder='Senha atual...' />
              </FormGroup>
              <SetPasswordForm ref='setPasswordForm'
                              passwordLabel='Nova senha:'
                              passwordPlaceholder='Nova senha...'
                              confirmPasswordPlaceholder='Confirmar senha...' />
              <FormGroup className='text-right'>
                <Button type='submit' bsStyle='primary'>Alterar senha</Button>
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
})(ChangePassword);
