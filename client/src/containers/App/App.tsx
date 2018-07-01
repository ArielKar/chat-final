import * as React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import './App.css';

import Login from "../LoginModal/Login";
import Header from "../../components/Header/Header";
import Chat from "../Chat/Chat";
import Footer from "../../components/Footer/Footer";

import Store from "../../appStore/store";
import {IAppState} from "../../entities";


class App extends React.Component<{}, IAppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: undefined,
            tree: undefined,
            conversation: undefined,
            messages: undefined,
            mode: undefined
        };

        Store.subscribe(({user: nextUser, tree: nextTree, conversation: nextConversation, messages: nextMessages, mode:nextMode}: IAppState) => {

            this.setState({
                user: nextUser,
                tree: nextTree,
                conversation: nextConversation,
                messages: nextMessages,
                mode: nextMode
            });
        });
    }

    public render() {
        const login = () => {
            if (!!this.state.user) {
                return <Redirect to="/chat"/>;
            }
            return (
                <>
                    <Login/>
                    <div className="App">
                        <Header user={this.state.user}/>
                        <Chat user={this.state.user} tree={this.state.tree} conversation={this.state.conversation} messages={this.state.messages} mode={this.state.mode}/>
                        <Footer/>
                    </div>
                </>
            )
        };

        const chat = () => {
            if (!this.state.user) {
                return <Redirect to='/login'/>
            }
            return (
                <div className="App">
                    <Header user={this.state.user.name}/>
                    <Chat user={this.state.user.name} tree={this.state.tree} conversation={this.state.conversation} messages={this.state.messages} mode={this.state.mode}/>
                    <Footer/>
                </div>
            );
        };

        const renderDecider = () => (
            !this.state.user ?
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

export default App;