import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

const KEY = 'UdacityFlashCards:notification';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Take a quiz!',
        body: "Come and take your quiz",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let day = new Date();
                            day.setDate(day.getDate() + 1);
                            day.setHours(21);
                            day.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: day,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}