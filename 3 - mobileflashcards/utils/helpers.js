import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcard:notifications';
const CHANNEL_ID = 'DailyReminder';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

function createNotification() {
    return {
        title: 'Mobile Flashcards Reminder',
        body: "👋 Don't forget to study for today!",
        ios: {
            sound: true
        },
        android: {
            channelId: CHANNEL_ID,
            sticky: false,
            color: 'red'
        }
    };
}

function createChannel() {
    return {
        name: 'Daily Reminder',
        description: 'This is a daily reminder for you to study your flashcards.',
        sound: true,
        priority: 'high'
    };
}

export function setLocalNotification() {

}
