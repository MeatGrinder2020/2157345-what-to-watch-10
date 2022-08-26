import React, { FormEvent, useRef, useState } from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

type Password = string;
type Email = string;
type ErrorMessages = {
  isCorrectLogin: boolean,
  isCorrectPassword: boolean
}

const checkIsCorrectLogin = (login: Email):boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(login);
};

const checkIsCorrectPassword = (password: Password):boolean => {
  if (password && password.length > 0) {
    return true;
  }
  return false;
};

const createErrorMessages = ({isCorrectLogin, isCorrectPassword}: ErrorMessages) => {
  const arrayMessagesError = [];
  if (!isCorrectLogin && !isCorrectPassword) {
    arrayMessagesError.push('We can’t recognize this email and password combination. Please try again.');
  } else if (!isCorrectPassword) {
    arrayMessagesError.push('Please enter a valid password. Password must be minimum one symbol');
  } else if (!isCorrectLogin) {
    arrayMessagesError.push('Please enter a valid email address');
  }
  return arrayMessagesError;
};

function SingInPage (): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [messagesError, setMessagesError] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      const login = loginRef.current.value;
      const password = passwordRef.current.value;
      const isCorrectLogin = checkIsCorrectLogin(login);
      const isCorrectPassword = checkIsCorrectPassword(password);
      if (isCorrectLogin && isCorrectPassword){
        setMessagesError([]);
        onSubmit({
          login,
          password,
        });
      } else {
        const arrayMessagesError = createErrorMessages({isCorrectLogin, isCorrectPassword});
        setMessagesError(arrayMessagesError);
      }
    }
  };

  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__message">
            {messagesError.map((message)=><p key={message}>{message}</p>)}
          </div>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef}className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
export default SingInPage;
