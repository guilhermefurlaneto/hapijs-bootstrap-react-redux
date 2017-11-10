import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormGroup } from 'react-bootstrap';

class SetPasswordForm extends Component {
  static propTypes = {
    password : PropTypes.string,
    passwordLabel : PropTypes.string,
    passwordPlaceholder : PropTypes.string,
    confirmPassword : PropTypes.string,
    confirmPasswordLabel : PropTypes.string,
    confirmPasswordPlaceholder : PropTypes.string,
  };

  getValues() {
    return {
      password : this.refs.password.value,
      confirmPassword : this.refs.confirmPassword.value,
    };
  }

  render() {
    return (
      <div>
        <FormGroup>
            <ControlLabel>{this.props.passwordLabel || 'Senha'}</ControlLabel>
            <input key='password'
                  name='password'
                  ref='password'
                  type='password'
                  className='form-control'
                  defaultValue=''
                  placeholder={this.props.passwordPlaceholder || 'Senha'} />
        </FormGroup>
        <FormGroup>
            <ControlLabel>{this.props.confirmPasswordLabel || 'Confirmar senha'}</ControlLabel>
            <input key='confirmPassword'
                  name='confirmPassword'
                  ref='confirmPassword'
                  type='password'
                  className='form-control'
                  defaultValue=''
                  placeholder={this.props.confirmPasswordPlaceholder || 'Confirmar senha...'} />
        </FormGroup>
      </div>
    );
  }
}

export default SetPasswordForm;
