import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Service from '../../service';

import './index.css';

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: '',
    password: ''
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resp = await Service.signIn(
      form.userId.toString(),
      form.password.toString()
    );

    localStorage.setItem('token', resp || '123456');
    history.push('/todo');
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className='SignIn__container'>
      <form onSubmit={signIn}>
        <div className='SignIn__info'>
          <label htmlFor='user_id'>User id</label>

          <input
            id='user_id'
            name='userId'
            value={form.userId}
            onChange={onChangeField}
          />

          <label htmlFor='password'>Password</label>

          <input
            id='password'
            name='password'
            type='password'
            value={form.password}
            onChange={onChangeField}
          />
        </div>
        <button className='SignIn_button' type='submit'>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
