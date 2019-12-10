import React from 'react';
import ReactDOM from 'react-dom';

function LoginButton(props){
    return (
        <button onClick = {props.onClick}>
            Log in
        </button>
    )
}
function LogoutButton(props){
    return (
        <button onClick = {props.onClick}>
            Log out
        </button>
    )
}
function UserGreeting(props){
    return <h1>Welcome back!</h1>
}
function GuestsGreeting(props){
    return <h1>Please sign up.</h1>
}
function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting />
    }else{
        return <GuestsGreeting />
    }
}
class LoginControl extends React.Component{
    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            isLoggedin: false
        };
    }
    handleLoginClick(){
        this.setState({
            isLoggedin : true
        })
    }
    handleLogoutClick(){
        this.setState({
            isLoggedin : false
        })
    }
    render(){
        const isLoggedin = this.state.isLoggedin;
        let button;
        if(isLoggedin){
            button = <LogoutButton onClick = {this.handleLogoutClick} />;
        }else{
            button = <LoginButton onClick = {this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedin = {isLoggedin} />
                {button}
            </div>
        )
    }
}


ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
)
// nested의 개념
// HelloWorld는 다른 JSX안에 nested되거나 위로 nest를 할 수 있다는 개념