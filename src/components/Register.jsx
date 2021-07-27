import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';
import firebase from 'firebase';
import {onUserRegister} from '../actions'

const cookie = new Cookies();

class Register extends Component {

    constructor(){
        super();
        this.state = {user: null} 
    }

    renderButtonRegister = () => {
        return (<div className="form-group">
        <input type="button" name="submit" id="submit" className="form-submit" defaultValue="Register" onClick ={this.onBtnRegisterClick}/>
    </div>)
    }  
    
    onBtnRegisterClick = () => {
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            console.log(error.code);
            console.log(error.message);
        });

        this.setState({user:email})
        cookie.set('dataUser', email, {path: '/'})
    }

    render() {
        if (this.state.user === null) {
            return (
                <div className= "bodyRegister"> 
                    <div className="main">
                        <section className="signup">
                            <div className="container1">
                                <div className="signup-content">
                                    <form method="POST" id="signup-form" className="signup-form">
                                        <h2 className="form-title">Let's Join the Club!</h2>
                                        <center><p>Please fill the form below</p></center>
                                        <div><br/></div>
                                        <div className="form-group">
                                            <input type="text" className="form-input" ref="email" name="email" id="email" placeholder="Email" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-input" ref="password" name="password" id="password" placeholder="Password" />
                                        </div>
                                        {this.renderButtonRegister()}
                                    </form>
                                    <p className="loginhere">
                                        Already have an account ? <a href="/login" className="loginhere-link">Login here</a>
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

export default Register;