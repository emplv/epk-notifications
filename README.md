# epk-notifications

Notifications system for any ES6 project. Easy to initialize and use.
**Can use** localStorage to save all closed custom made notifications.

Adds itself to the DOM, create each notification item and removes it after time ended, when closed.

Easy, clean, fast.

## Usage

Initialize, i.e., **Notification.js**
```
import NotificationsSystem from './src/Notifications';

const Notification = new NotificationsSystem({}); // pass custom properties

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
new NotificationsSystem({ container, className, useLocalStorage, localStorageName, limit });
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cotainer | string | 'body' | DOM element identifier, where notification system main container will be placed |
| className | string |  | adds custom class to notification system main container |
| useLocalStorage | boolean | true | enable/disable localStorage usage |
| localStorageName | string | 'notifications' | name under which closed custom notifications will be stored in localStorage |
| limit | integer | 0 | Sets limit of maximum active notifications |

### Notification creation API with defaults

- Notification.create({ type, title, message, time, name, save });
- Notification.info({ title, message, time, name, save });
- Notification.success({ title, message, time, name, save });
- Notification.warning({ title, message, time, name, save });
- Notification.error({ title, message, time, name, save });
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
Notification.success({
	title: 'New item', 
	message: '<p>Added new item with name: <b>javascript</b></p>'
});
```

**error** type notification for 4000ms:
```
Notification.error({
	title: 'Error', ,
	message: 'Please do not do that!', 
	time: 4000
});
```

**info** type notification, stays until closed, save notification name in localStorage, when closed:
```
Notification.info({
	title: 'Important information', 
	message: 'Read me all!', 
	name: 'info1',
	save: true
});
```

Clear all stored notification names from memory, and localStorage if enabled:
```
Notification.clearClosedList();
```

## Storing in memory

If **save** is passed as `true`, then on close (automatic or manual) this notification name will be stored in class private array.
Store in localStorage - optional feature, when used stored custom made notification names in localStorage. Usefull, when need to show notification only once to user.
