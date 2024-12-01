import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const LoginPage = () => {
    const [user, setUser] = useState({email: '', password: ''});

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }

    return(
        <div className="login-page">
            <h2>Welcome to Invoicee</h2>
            <p>Please input sign in information</p>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            <div>
                <h4><Link to='/signUpForm'>Or sign up here</Link></h4>
            </div>
        </div>
    )
}

export default LoginPage;