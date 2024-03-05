import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import CalendarPicker from "react-native-calendar-picker";
import { TextInput } from 'react-native-gesture-handler';
import GlobalAPI from '../../Utils/GlobalAPI';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';


export default function BookingModal({ businessId, hideModal }) {
    const [timeList, setTimeList] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [note, setNote] = useState();
    const { user } = useUser();
    useEffect(() => {
        getTime();
    }, [])
    const getTime = () => {
        const timeList = [];
        for (let i = 8; i <= 12; i++) {
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for (let i = 1; i <= 7; i++) {
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i + ':30 PM'
            })
        }
        setTimeList(timeList);
    }

    const createNewBooking = () => {
        if (!selectedDate || !selectedTime) {
            ToastAndroid.show('Select Date and Time First', ToastAndroid.LONG)
            return;
        }
        const data = {
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            date: moment(selectedDate).format('DD-MM-YYYY'),
            time: selectedTime,
            businessid: businessId,
        }
        GlobalAPI.createBooking(data).then(resp => {
            console.log("Resp", resp),
                ToastAndroid.show('Booking Created Scuccessfully', ToastAndroid.LONG)
            hideModal();
        })
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView style={{ padding: 20 }}>
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center' }} onPress={() => hideModal()}>
                    <FontAwesome name="arrow-circle-left" size={30} color={Colors.BLACK} />
                    <Heading text={'Booking'} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>

                    <Heading text={'Select Date'} />
                </View>
                <View style={styles.calendarContainer}>
                    <CalendarPicker onDateChange={setSelectedDate} width={340} minDate={Date.now()} todayBackgroundColor={Colors.PRIMARY} todayTextStyle={{ color: Colors.WHITE }} selectedDayColor={Colors.BLACK} selectedDayTextColor={Colors.WHITE} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Heading text={'Select Time Slot'} />
                    <FlatList
                        data={timeList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setSelectedTime(item.time)}>
                                <Text style={[selectedTime == item.time ? styles.selectedTime : styles.unselectedTime]}>{item.time}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={{ paddingTop: 15 }}>
                    <Heading text={'Any Suggestions'} />
                    <TextInput placeholder='Note' numberOfLines={4} multiline={true} style={styles.noteTextArea} onChange={(text) => setNote(text)} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity onPress={() => createNewBooking()} >
                        <Text style={styles.confirmButton}>Confirm and Book</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    calendarContainer: {
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 20,
        borderRadius: 15,
    },
    selectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        color: Colors.WHITE,
        backgroundColor: Colors.PRIMARY,


    },
    unselectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        color: Colors.PRIMARY,

    },
    noteTextArea: {
        borderWidth: 1,
        borderRadius: 15,
        textAlignVertical: 'top',
        padding: 20,
        fontSize: 16,
        fontFamily: 'outfit',
        borderColor: Colors.PRIMARY_LIGHT,
    },
    confirmButton: {
        textAlign: 'center',
        fontFamily: 'outfit',
        fontSize: 17,
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 99,
        color: Colors.WHITE,
        elevation: 2
    }
})
