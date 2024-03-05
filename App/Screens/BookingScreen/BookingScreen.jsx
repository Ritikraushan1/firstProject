import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import GlobalAPI from '../../Utils/GlobalAPI'
import { useUser } from '@clerk/clerk-expo'
import { BusinessListItem } from "../BusinessListByCategory/BusinessListItem"

export default function BookingScreen() {
    const [userBooking, setUserBooking] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        user && getUserBookings();
    }, [])
    const getUserBookings = () => {
        GlobalAPI.getUserBooking(user.primaryEmailAddress.emailAddress).then(resp => {
            console.log(resp);
            setUserBooking(resp.bookings);
        })
    }
    return (
        <View style={{ padding: 20 }}>
            <Heading text={'My Bookings'} />
            <View>
                <FlatList data={userBooking} renderItem={({ item, index }) => (
                    <BusinessListItem business={item.businessList} booking={item} />
                )} />
            </View>
        </View>
    )
}