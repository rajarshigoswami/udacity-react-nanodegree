import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { styles } from '../utils/styles'

export default function TouchButton({ children, onPress, disabled = false }) {
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity style={disabled ? styles.disabledBtn : styles.btn} disabled={disabled} onPress={onPress}>
                <Text style={[styles.btnTxt]}>
                    {children}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

