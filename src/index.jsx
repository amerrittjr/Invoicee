import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignUpForm from './signUpForm';
import UserList from './UserList';

const App = () => {
  return (
    <div>
      <SignUpForm />
      <UserList />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);