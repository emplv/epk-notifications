import React from 'react';
import ReactDOM from 'react-dom';
import NotificationItem from './NotificationItem';

export default class NotificationsSystem {
    constructor(container = 'body', className = '', useLocalStorage = true, localStorageName = 'notifications') {
        this.container = container;
        this.className = className;
        this.useLocalStorage = useLocalStorage;
        this.localStorageName = localStorageName;
        let closedList = [];
        if (typeof localStorage !== undefined && useLocalStorage) {
            let items = localStorage.getItem(localStorageName);
            if (items) {
                closedList = JSON.parse(items);
            }
        }
        this.closedList = closedList;
        this.activeList = [];
    }

    init() {
        let div = document.createElement('div');
        div.setAttribute('id', 'notifications');
        div.classList.add('notifications-container');
        document.querySelector(this.container).prepend(div);
    }

    getNotificationsContainer() {
        let container = document.getElementById('notifications');
        // if fail - create
        if (!container) {
            this.init();
        }
        return container;
    }

    generateName() {
        return Math.random().toString(36).substr(2, 9);
    }

    getFromLocalStorage(notificationName) {
        // check if localStorage is available
        if (typeof localStorage !== 'undefined') {
            let items = localStorage.getItem(this.localStorageName);
            if (items !== undefined) {
                items = JSON.parse(items);
            }
            return !!items && items.indexOf(notificationName) >= 0;
        }
    }

    setInLocalStorage(notificationName) {
        // check if localStorage is available
        if (typeof localStorage !== 'undefined') {
            let items = localStorage.getItem(this.localStorageName);
            if (items === undefined || items === null) {
                items = [];
            } else {
                items = JSON.parse(items);
            }
            items.push(notificationName);
            items = JSON.stringify(items);
            localStorage.setItem(this.localStorageName, items);
            return this.getFromLocalStorage(notificationName);
        }
    }

    getFromClosedList(notificationName) {
        let items = this.closedList;
        return !!items && items.indexOf(notificationName) >= 0;
    }

    setInClosedList(notificationName) {
        return !!this.closedList.push(notificationName);
    }

    remove(notificationName, save) {
        // save notification name only if it is custom
        if (save) {
            this.setInClosedList(notificationName);
            if (this.useLocalStorage) {
                this.setInLocalStorage(notificationName);
            }
        }
        let index = this.activeList.indexOf(notificationName);
        this.activeList.splice(index, 1);
    }

    create(type = 'info', title = 'Title', message = 'Message', timerOrName = 1000, save = false) {
        let timer = 0;
        let name = this.generateName();
        if (Number.isInteger(Number.parseInt(timerOrName))) {
            timer = timerOrName;
        } else {
            name = timerOrName;
            save = true;
        }
        // break if already in localstorage or has been closed in this session
        if ((this.useLocalStorage && this.getFromLocalStorage(name)) || this.getFromClosedList(name)) {
            return;
        }
        // do only if not already active
        if (this.activeList.indexOf(name) < 0) {
            let parent = document.createElement('div');
            parent.classList.add(`notifications-item`);
            parent.classList.add(`notif-${type}`);
            let container = this.getNotificationsContainer();
            if (container) {
                container.append(parent);
                ReactDOM.render(
                    <NotificationItem
                        type={type}
                        title={title}
                        message={message}
                        timer={timer}
                        name={name}
                        save={save}
                        close={this.remove.bind(this, name, save)}
                    />,
                    parent
                );
            }
            this.activeList.push(name);
        }
    }

    info(title, message, timerOrName, save) {
        this.create('info', title, message, timerOrName, save);
    }

    warning(title, message, timerOrName, save) {
        this.create('warning', title, message, timerOrName, save);
    }

    success(title, message, timerOrName, save) {
        this.create('success', title, message, timerOrName, save);
    }

    clearClosedList() {
        this.closedList = [];
        if (this.useLocalStorage) {
            this.clearLocalStorage();
        }
    }

    clearLocalStorage() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.localStorageName, '[]');
        }
    }
};
