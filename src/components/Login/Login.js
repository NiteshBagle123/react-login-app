import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';

import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value: action.value, isValid: action.value.includes('@') }
  }

  if(action.type === 'USER_EMAIL_VALIDATE'){
    return { value: state.value, isValid: state.value.includes('@') }
  }

  return {
    value: '',
    isValid: false
  }
};

const passwordReducer = (state, action) => {
  if(action.type === 'PASSWORD_INPUT'){
    return { value: action.value, isValid: action.value.trim() > 6 }
  }

  if(action.type === 'PASSWORD_VALIDATOR'){
    return { value: state.value, isValid: state.value.trim() > 6 }
  }

  return {
    value: '',
    isValid: false 
  }
};

const Login = () => {
  const ctx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(
    emailReducer, { value: '', isValid: false }
  );

  const [ passwordState, dispatchPassword] = useReducer(
    passwordReducer, { value: '', isValid: false }
  );

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking validaity!');
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState, passwordState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'PASSWORD_INPUT', value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'USER_EMAIL_VALIDATE' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'PASSWORD_VALIDATOR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      ctx.onLogIn(emailState.value, passwordState.value);
    } else if(!emailState.isValid){
      emailInputRef.activate();
    } else {
      passwordInputRef.activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef} 
          isValid={emailState.isValid}
          id="email"
          label="E-Mail"
          value={emailState.value}
          onChange={emailChangeHandler}
          validate={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordState.isValid}
          id="password"
          label="Password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          validate={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
