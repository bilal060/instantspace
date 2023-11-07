import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { icons } from '../../assets/icons'
const CIcon = (props) => {
    const { type, name, color, size, styles } = props
    const MyIcon = icons[type]
    return (
        <View>
            <MyIcon  name={name} color={color} style={styles} size={size}  />
        </View>
    )
}

export default CIcon

const styles = StyleSheet.create({})