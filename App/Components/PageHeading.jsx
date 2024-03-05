import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Heading from './Heading'
import Colors from '../Utils/Colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

export default function PageHeading() {
    const navigation = useNavigation();
    const param = useRoute().params;
    return (
        <View style={{ padding: 20 }}>
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                <FontAwesome name="arrow-circle-left" size={30} color={Colors.BLACK} />
                <Heading text={'Booking'} />
            </TouchableOpacity>
        </View>
    )
}