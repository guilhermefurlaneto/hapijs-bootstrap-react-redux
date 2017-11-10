import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, ControlLabel, FormGroup, Row } from 'react-bootstrap';

import { actionsCreator } from '../../reducers/user';

class PasswordRecovery extends Component {

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const payload = {
      email: this.refs.email.value,
      ...this.refs.setPasswordForm.getValues(),
    };

    this.props.dispatch(
      actionsCreator.requestPasswordRecovery(payload)
    );
  }

  render() {
    return (
      <Row>
        <Col md={4} mdOffset={4}>
          <form className='panel panel-default login-form'
            onSubmit={this.onSubmit.bind(this)}>

            <div className='panel-heading'>
              Recuperar senha
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
              <p>Um e-mail lhe será enviado com um link para a recuperação da sua senha.</p>
              <FormGroup className='text-right'>
                <Button type='submit' bsStyle='primary'>Recuperar senha</Button>
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
    app: store.app,
    user: store.user,
  };
})(PasswordRecovery);
