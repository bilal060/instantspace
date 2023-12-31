import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { themes } from '../../../theme/colors';

export function CustomDropdown({icon, label, data, onSelect }) {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [dropdownTop, setDropdownTop] = useState(0);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        setVisible(true);
    };

    const onItemPress = (item) => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
            <MaterialIcons name={icon} size={24} color="grey" />
            <Text style={styles.buttonText}>{selected ? selected.label : label}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="gray" />
            <Modal
                visible={visible}
                transparent={true}
                animationType="fade"
            >
                <View style={[styles.overlay, { top: dropdownTop }]}>
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.close} onPress={() => setVisible(!visible)}>
                            <MaterialIcons name="close" size={15} color="white" />
                        </TouchableOpacity>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 0.6,
        height: 47,
        paddingHorizontal:3
    },
    buttonText: {
        flex: 1,
        textAlign: 'left',
        color: 'gray',
        marginLeft:7
    },
    dropdown: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        width: '80%'
    },
    overlay: {
        position: 'absolute',
        top: 50,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 0.8,
        borderBottomColor:"lightgray"
    },
    itemText: {
        fontSize: 16,
        color: 'black'
    },
    close: {
        backgroundColor: 'red',
        borderRadius: 10,
        margin: 5,
        padding: 5,
        alignSelf:'flex-start'
    }
});

export default CustomDropdown;
