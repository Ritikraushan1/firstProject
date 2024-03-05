import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItem({ business, booking }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.push('business-details', {
            business: business
        })}>
            <Image source={{ uri: business?.images[0]?.url }} style={styles.imageContainer} />
            <View style={styles.subContainer}>
                <Text style={{ fontSize: 15, fontFamily: 'outfit' }}>{business.contactPerson}</Text>
                <Text style={{ fontSize: 19, fontFamily: 'outfit-bold' }}>{business.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Entypo name="location-pin" size={20} color={Colors.PRIMARY} />
                    <Text style={{ fontSize: 16, fontFamily: 'outfit' }}>{business.address}</Text>
                    {booking && (
                        <Text>Show Booking</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    subContainer: {
        display: 'flex',
        gap: 7
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 15,
    }
})
