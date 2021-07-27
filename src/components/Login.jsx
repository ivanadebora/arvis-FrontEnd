import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import firebase from 'firebase';
import { googleProvider, auth } from '../firebase';

const cookie = new Cookies();

class Login extends Component {

    constructor(){
        super();
        this.state = {user: null} 
    }
    
    async login() {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        let username

        if(email == ''){
            const google = await auth().signInWithPopup(googleProvider);
            username = google.user.displayName
        }
        else if(email != ''){
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                console.log(error.code);
                console.log(error.message);
            });
            username = email
        }

        this.setState({user: username});
        cookie.set('dataUser', username, {path: '/'})
    }

    renderButtonLogin = () => {
        return (
            <div className="form-group">
                <input type="button" name="submit" id="login" className="form-submit" defaultValue="Log In" onClick ={this.login.bind(this)}/>
                <center><p>- or -</p></center>
                <input type="button" name="submit" id="google" className="form-submit" defaultValue="Sign in with Google" onClick ={this.login.bind(this)}/>
            </div>
        )
    }
    
    render() {
        if(this.state.user == null){
            return(
                <div className= "bodyRegister"> 
                    <div className="main">
                        <section className="signup">
                            <div className="container1">
                                <div className="signup-content">
                                    <form method="POST" id="signup-form" className="signup-form">
                                        <center>
                                        <h4 className="form-title">It's Nice to See You Back!</h4>
                                        <p>Please enter your email and password</p>
                                        </center>
                                        <div><br/></div>
                                        <div className="form-group">
                                            <input type="email" className="form-input" ref="email" name="email" id="email" placeholder="Email" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-input" ref="password" name="password" id="password" placeholder="Password" />
                                        </div>
                                        {this.renderButtonLogin()}
                                    </form>
                                    <p className="loginhere">
                                        Don't have any account yet? <a href="/register" className="loginhere-link">Register here</a>
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div> 
            )
        }
        return <Redirect to="/" />
    }
}



export default Login;