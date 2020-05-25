import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { styles } from '../utils/styles'

export default function TextButton({ children, onPress, style = {} }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text style={[styles.reset]}>{children}</Text>
            </TouchableOpacity>
        </View>
    )
}
