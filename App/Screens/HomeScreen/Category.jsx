import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalAPI from '../../Utils/GlobalAPI'
import { responsePathAsArray } from 'graphql'
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function Category() {

    const [categories, setCategoires] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        getCategories();
    }, [])
    const getCategories = () => {
        GlobalAPI.getCategory().then(resp => {

            setCategoires(resp?.categories);
        })
    }
    return (
        <View>
            <View style={{ padding: 10 }}>
                <Heading text={'Category'} isViewAll={true} />
                <FlatList
                    data={categories}
                    numColumns={4}
                    renderItem={({ item, index }) => index <= 3 && (
                        <TouchableOpacity style={styles.container} onPress={() => navigation.push('business-list', {
                            category: item.name
                        })}>
                            <View style={styles.iconContainer}>
                                <Image source={{ uri: item?.icon?.url }} style={{ width: 30, height: 30 }} />
                            </View>
                            <Text style={{ fontSize: 12, textAlign: 'center', fontFamily: 'outfit-medium', marginTop: 5 }}>{item?.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 15,
        borderRadius: 99,
    }
})
