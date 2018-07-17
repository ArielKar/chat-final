import * as React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';

import './App.css';

import Login from "../LoginModal/Login";
import Header from "../../components/Header/Header";
import Chat from "../Chat/Chat";
import Footer from "../../components/Footer/Footer";
import {connect} from "react-redux";
import * as thunks from "../../store/thunks";
import * as actions from '../../store/actions';

class App extends React.Component<any, {}> {

    public render() {
        const login = () => {
            if (!!this.props.user) {
                return <Redirect to="/chat"/>;
            }
            return (
                <>
                    <Login login={this.props.login}/>
                    <div className="App">
                        <Header/>
                        <Chat/>
                        <Footer/>
                    </div>
                </>
            )
        };

        const chat = () => {
            if (!this.props.user) {
                return <Redirect to='/login'/>
            }
            return (
                <div className="App">
                    <Header user={this.props.user}
                            logout={this.props.logout}
                            setMode={this.props.setMode}
                            deleteGroup={this.props.deleteGroup}/>
                    <Chat/>
                    <Footer/>
                </div>
            );
        };

        const renderDecider = () => (
            !this.props.user ?
                (<Redirect to="/login"/>) :
                (<Redirect to="/chat"/>)
        );

        return (
            <BrowserRouter>
                <>
                    <Route exact={true} path="/" render={renderDecider}/>
                    <Route path="/login" render={login}/>
                    <Route path="/chat" render={chat}/>
                </>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.usersRdcr.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (name, password) => dispatch(thunks.login(name, password)),
        logout: () => dispatch(actions.logout()),
        setMode: (mode) => dispatch(actions.setMode(mode)),
        deleteGroup: () => dispatch(thunks.deleteGroup())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);