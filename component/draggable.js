import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist'
import { LogBox } from 'react-native';


class Example extends Component {
    componentDidMount() {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }
    state = {
        data: [...Array(10)].map((d, index) => ({
            key: `item-${index}`,
            label: index,
            backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${128})`,
        }))
    }

    renderItem = ({ item, index, move, moveEnd, isActive }) => {
        return (
            <TouchableOpacity
                style={{
                    height: 100,
                    backgroundColor: isActive ? 'blue' : item.backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onLongPress={move}
                onPressOut={moveEnd}>
                <Text style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 32,
                }}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <DraggableFlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => `draggable-item-${item.key}`}
                    scrollPercent={5}
                    onMoveEnd={({ data }) => this.setState({ data })}
                />
            </View>
        )
    }
}

export default Example
