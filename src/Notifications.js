export default class NotificationsSystem {
  constructor ({ container = 'body', className = '', useLocalStorage = true, localStorageName = 'notifications', limit = 0 }) {
    this.container = container && document.querySelector(container);
    this.className = className;
    this.useLocalStorage = useLocalStorage;
    this.localStorageName = localStorageName;
    this.limit = parseInt(limit);
    this.counter = 0;
    this.activeList = {};
    this.activeNames = {};
    this.closedList = [];
    // check if localStorage is available
    if (typeof localStorage !== undefined && useLocalStorage) {
      let items = localStorage.getItem(localStorageName);
      if (items) {
        this.closedList = JSON.parse(items);
      }
    }
    this.createWrapper();
  }

  createWrapper () {
    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('id', 'notifications');
    this.wrapper.classList.add('notifications-container');
    this.className && this.wrapper.classList.add(this.className);
    this.container.appendChild(this.wrapper);
  }

  generateName () {
    let name = Math.random().toString(36).substr(2, 9);
    return this.activeList[ name ] ? this.generateName() : name;
  }

  getFromLocalStorage (notificationName) {
    // check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      let items = localStorage.getItem(this.localStorageName);
      if (items !== undefined) {
        items = JSON.parse(items);
      }
      return !!items && items.indexOf(notificationName) >= 0;
    }
  }

  setInLocalStorage (notificationName) {
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

  getFromClosedList (notificationName) {
    let items = this.closedList;
    return !!items && items.indexOf(notificationName) >= 0;
  }

  setInClosedList (notificationName) {
    return !!this.closedList.push(notificationName);
  }

  create ({ type = 'info', title = 'Title', message = 'Message', time = 1000, name = null, save = false }) {
    const id = this.counter++;
    if (!name) {
      name = this.generateName();
    }
    // break if already in localstorage, has been closed in this session or is active
    if (
      (this.useLocalStorage && this.getFromLocalStorage(name))
      || this.getFromClosedList(name)
      || this.activeNames[ name ]
    ) {
      return;
    }


    let item = document.createElement('div');
    item.classList.add('notifications-item', `notification-type-${type}`)
    item.setAttribute('id', `notification-id-${name}`)
    let itemTitle = document.createElement('div');
    itemTitle.classList.add('notification-title')
    itemTitle.innerHTML = title;
    let itemMessage = document.createElement('div');
    itemMessage.classList.add('notification-message');
    itemMessage.innerHTML = message;
    let closeBtn = document.createElement('div');
    closeBtn.classList.add('notification-close');
    closeBtn.innerText = '×';
    closeBtn.addEventListener('click', this.close.bind(this, id));
    item.appendChild(itemTitle);
    item.appendChild(itemMessage);
    item.appendChild(closeBtn);

    let timeout = setTimeout(() => {
      this.close(id);
    }, parseInt(time));
    this.wrapper.appendChild(item);
    this.activeList[ id ] = {
      name,
      save,
      item,
      timeout
    };
    this.activeNames[ name ] = true
    if (this.limit && Object.keys(this.activeList).length > this.limit) {
      this.close(Object.keys(this.activeList)[ 0 ]);
    }
  }

  close (id) {
    let { name, save, item, timeout } = this.activeList[ id ];
    clearTimeout(timeout);
    // save notification name only if it is custom
    if (save) {
      this.setInClosedList(name);
      if (this.useLocalStorage) {
        this.setInLocalStorage(name);
      }
    }
    item.remove();
    delete this.activeList[ id ];
    delete this.activeNames[ name ];
  }

  info (params = {}) {
    params.type = 'info';
    this.create(params);
  }

  success (params = {}) {
    params.type = 'success';
    this.create(params);
  }

  warning (params = {}) {
    params.type = 'warning';
    this.create(params);
  }

  error (params = {}) {
    params.type = 'error';
    this.create(params);
  }

  clearClosedList () {
    this.closedList = [];
    if (this.useLocalStorage) {
      this.clearLocalStorage();
    }
  }

  clearLocalStorage () {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.localStorageName, '[]');
    }
  }
};
