import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY,
        }}>
            <Tab.Screen name='Home' component={HomeNavigation}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 16, fontWeight: 'bold', marginTop: -7 }}>Home</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name='Booking' component={BookingScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 16, fontWeight: 'bold', marginTop: -7 }}>Booking</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bookmark" size={size} color={color} />
                    ),
                }} />
            <Tab.Screen name='Profile' component={ProfileScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 16, fontWeight: 'bold', marginTop: -7 }}>Profile</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="account-circle" size={size} color={color} />
                    ),
                }} />
        </Tab.Navigator>
    )
}