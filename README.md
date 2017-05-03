# ep-notifications

Notifications system for any React project. Easy to initialize and use.
**Can use** localStorage to save all closed custom made notifications.

## Usage

Initialize, i.e., **Notification.js**
```
import NotificationsSystem from './src/Notifications';

const Notification = new NotificationsSystem(); // pass custom properties

export default Notification;
```

Include where needed, i.e., **AddItem.js**
```
import Notification from './Notification';

Notification.create(); // will show notification with default parameters
```

## Default parameters

### Initializing class

```
new NotificationsSystem(container, className, useLocalStorage, localStorageName);
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cotainer | string | 'body' | DOM element identifier, where notification system main container will be placed |
| className | string |  | adds custom class to notification system main container |
| useLocalStorage | boolean | true | enable/disable localStorage usage |
| localStorageName | string | 'notifications' | name under which closed custom notifications will be stored in localStorage |

### Notification creation API with defaults

- Notification.create(type, title, message, timerOrName, save);
- Notification.info(title, message, timerOrName, save);
- Notification.success(title, message, timerOrName, save);
- Notification.warning(title, message, timerOrName, save);
- Notification.clearClosedList();

| Name | Type | Default | Description |
|------|------|---------|-------------|
| type | string | 'info' | Define notification type |
| title | string | 'Title' | Title for the notification |
| message | string | 'Message' | Message for the notification, can be a string or jsx for extra html |
| timerOrName | number/string | 1000 | Determine if notification times out (pass number in ms) or stays until closed (with custom name) |
| save | boolean | false | Tells if notification on close should be stored in memory |

#### Examples

**success** type notification with additional html in the message for 1000ms:
```
Notification.success('New item', (<p>Added new item with name: <b>javascript</b></p>));
```

**warning** type notification for 4000ms:
```
Notification.warning('Error', 'Please do not do that!', 4000);
```

**info** type notification, stays until closed, save notification name in localStorage, when closed:
```
Notification.info('Important information', 'Read me all!', 'info1', true);
```

Clear all stored notification names from memory, and localStorage if enabled:
```
Notification.clearClosedList();
```

## Storing in memory

If **save** is passed as `true`, then on close (automatic or manual) this notification name will be stored in class private array.
Store in localStorage - optional feature, when used stored custom made notification names in localStorage. Usefull, when need to show notification only once to user.
