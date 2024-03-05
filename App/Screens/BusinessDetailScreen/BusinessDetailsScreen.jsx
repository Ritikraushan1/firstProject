import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import Heading from '../../Components/Heading';
import { Entypo } from '@expo/vector-icons';
import BusinessPhotos from './BusinessPhotos';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {
    const param = useRoute().params;
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [business, setBusiness] = useState(param.business);
    const [isReadMore, setReadMore] = useState(false);
    useEffect(() => {

    }, [])
    return business && (
        <View>


            <ScrollView style={{ height: '91%' }}>
                <TouchableOpacity style={{ position: 'absolute', padding: 20, zIndex: 10 }} onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-circle-left" size={30} color={Colors.WHITE} />
                </TouchableOpacity>
                <Image source={{ uri: business?.images[0]?.url }} style={styles.imageContainer} />
                <View style={styles.infoContainer}>
                    <Text style={{ fontFamily: 'outfit-bold', fontSize: 18 }}>{business.name}</Text>
                    <View style={styles.subContainer}>
                        <Text style={{ fontFamily: 'outfit-medium', color: Colors.PRIMARY, fontSize: 20 }}>{business.contactPerson}</Text>
                        <Text style={{ fontFamily: 'outfit', color: Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT, borderRadius: 10, padding: 5, fontSize: 14 }}>{business.category.name}</Text>

                    </View>
                    <Text style={{ fontSize: 17, fontFamily: 'outfit', color: Colors.GRAY }}><Entypo name="location-pin" size={20} color={Colors.PRIMARY} />{business.address}</Text>
                    <View style={{ borderWidth: 0.5, color: Colors.LIGHT_GRAY, marginTop: 10, marginBottom: 10 }}></View>
                    <View>
                        <Heading text={'About'} />
                        <Text style={{ fontFamily: 'outfit', lineHeight: 28, color: Colors.GRAY, fontSize: 16 }} numberOfLines={isReadMore ? 20 : 5}>{business.about}</Text>
                        <TouchableOpacity onPress={() => setReadMore(!isReadMore)}>

                            <Text style={{ color: Colors.PRIMARY, fontSize: 16, fontFamily: 'outfit' }}>{isReadMore ? 'Read Less' : 'Read More'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 0.5, color: Colors.LIGHT_GRAY, marginTop: 10, marginBottom: 10 }}></View>
                    <BusinessPhotos business={business} />
                </View>
            </ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, margin: 8, }}>
                <TouchableOpacity style={styles.messageButton}>
                    <Text style={{ textAlign: 'center', fontFamily: 'outfit-medium', color: Colors.PRIMARY, fontSize: 18 }}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookingButton} onPress={() => setShowModal(true)}>
                    <Text style={{ textAlign: 'center', fontFamily: 'outfit', color: Colors.WHITE }}>Book Now</Text>
                </TouchableOpacity>
            </View>
            <Modal animationType='slide' visible={showModal}>
                <BookingModal businessId={business.id} hideModal={() => setShowModal(false)} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        padding: 20,
        display: 'flex',
        gap: 7,
    },
    imageContainer: {
        width: '100%',
        height: 300,
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center',
    },
    messageButton: {
        padding: 12,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        flex: 1,
    },
    bookingButton: {
        padding: 12,
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        flex: 1
    }
})
