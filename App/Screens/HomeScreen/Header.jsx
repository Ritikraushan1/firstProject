import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from "@clerk/clerk-expo"
import Colors from '../../Utils/Colors'
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
    const { user, isLoading } = useUser();
    return user && (
        <View style={styles.container}>
            {/* Profile Section Code for homepage */}
            <View style={styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
                    <View>
                        <Text style={{ color: Colors.WHITE }}>Welcome,  </Text>
                        <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-bold' }}>{user?.fullName}</Text>
                    </View>
                </View>
                <FontAwesome name="bookmark-o" size={30} color="white" />
            </View>
            {/*Search Bar Section Just down the heading*/}
            <View style={styles.searchBarContainer}>
                <TextInput style={styles.textInput} placeholder='Search...' />
                <FontAwesome style={styles.searchButton} name="search" size={24} color={Colors.PRIMARY} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    textInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 16,
        fontFamily: 'outfit'
    },
    searchBarContainer: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    searchButton: {
        backgroundColor: Colors.WHITE,
        padding: 10,
        width: '12%',
        borderRadius: 8,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 99,
    },

})
