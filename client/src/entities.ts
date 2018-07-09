import * as React from "react";
import {ChangeEvent} from "react";
import {Action, Dispatch, Unsubscribe} from "redux";
import {IUser} from "../../server/src/models/interfaces/interfaces";

export interface IStateStore {
    state: Object;
    listeners: Function[];

    set(key: string, val: any): void;
    get(key: string): any | null;
    subscribe(callback: Function): void;
    onStateChanged(): void;
}

export interface IStore {
    dispatch: Dispatch<Action | any>;
    getState(): IState;
    subscribe(listener: () => void): Unsubscribe;
}

export interface IState {
    token: string | undefined;
    user: {_id: number, name: string, age: number} | undefined;
    tree: object | undefined;
    conversation: any | undefined;
    messages: object[] | undefined;
    error: String | undefined;
    mode: String | undefined;
    users: Object[] | undefined;
}

export interface IActionObj {
    type: string;
    payload?: any;
}

export interface IActionFunc {
    (dispatch: Function) : IActionObj;
}

export interface IAppState {
    user: any | undefined;
    tree: Object | undefined;
    conversation: any | undefined;
    messages: Object[] | undefined;
    mode: string | undefined;
}

export interface IChatProps {
    user: string | undefined;
    tree: Object | undefined;
    conversation: {id: string, name: string} | undefined;
    messages: Object[] | undefined;
    mode: string | undefined;
}

export interface ITreeProps {
    tree: Object | undefined;
}

export interface IMessagingState {
    messages: Object[] | undefined;
}

export interface IMessagingProps {
    user: string | undefined;
    conversation: {id: string, name: string} | undefined;
    messages: Object[] | undefined;
}

export interface INewMsgProps {
    addNewMessage: (value: string) => void;
}

export interface INewMsgState {
    inputValue: string;
}

export interface IButtonProps {
    text: string;
    type: string;
    class: string;
    isDisabled?: boolean;
    click: (event: React.MouseEvent<HTMLButtonElement> | undefined) => void;
}

export interface IFormControlProps {
    name: string;
    label: string;
    placeholder: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IHeaderProps {
    user: IUser;
}

export interface IMessagesProps {
    messages: Object[] | undefined;
}

export interface IMessage {
    type: string;
    sender: string;
    messageBody: string;
    time: string;
}