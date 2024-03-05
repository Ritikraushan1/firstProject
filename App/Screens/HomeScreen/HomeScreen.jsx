import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Category from './Category'
import BusinessLists from './BusinessLists'

export default function HomeScreen() {
    return (
        <ScrollView>
            <Header />
            <View style={{ padding: 25 }}>

                <Slider />
                <Category />
                <BusinessLists />
            </View>
        </ScrollView>
    )
}