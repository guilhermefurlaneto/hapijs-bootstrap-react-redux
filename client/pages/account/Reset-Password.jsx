import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, FormGroup, Row } from 'react-bootstrap';
import SetPasswordForm from './Set-Password-Form';
import { actionsCreator } from '../../reducers/user';

class ResetPassword extends Component {
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const payload = {
      token : this.props.resetToken,
      ...this.refs.setPasswordForm.getValues(),
    };

    this.props.dispatch(
      actionsCreator.resetPassword(payload)
    );
  }

  render() {
    return (
      <Row>
        <Col md={4} mdOffset={4}>
          <form className='panel panel-default login-form'
                onSubmit={this.onSubmit.bind(this)}>

            <div className='panel-heading'>
              Resetar senha
            </div>

            <div className='panel-body'>
              <SetPasswordForm ref='setPasswordForm'
                              passwordLabel='Nova senha:'
                              passwordPlaceholder='Nova senha...' />
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
    routing : store.routing,
  };
})(ResetPassword);
