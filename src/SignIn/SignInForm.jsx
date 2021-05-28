import React from 'react';
import '../assets/css/SignInForm.css';
import { Link } from 'react-router-dom';
class SignInForm extends React.Component {
    constructor() {
            super();
            this.state = {
                username: '',
                password: '',
            };
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        alert("You are submitting " + this.state.username + "your password is" + this.state.password);
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <div class="sign-in-password-form-container">
                    <label class="input-label">用户名</label>
                    <input class="input-information-name"
                        type='text'
                        name='username'
                        placeholder='请输入用户名'
                        onChange={this.myChangeHandler}
                    />
                    <div class="password-label-and-link">
                        <label class="input-label">Password</label>
                        <a class="forgot-pw-link"><Link to="/FindPasswordPage/">Forgot your password?</Link></a>
                    </div>
                    <input class="input-information-password"
                        type='password'
                        name='password'
                        placeholder='请输入密码'
                        onChange={this.myChangeHandler}
                    />
                    <input class="submit-button"
                        type='submit'
                        value='登录'
                    />
                </div>
            </form>
        )
    }
}

export default SignInForm;