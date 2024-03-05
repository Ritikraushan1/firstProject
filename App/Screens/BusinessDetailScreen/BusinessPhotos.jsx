import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading'

export default function BusinessPhotos({ business }) {
    return business && (
        <View>
            <Heading text={'Photos'} />
            <FlatList
                data={business.images}
                numColumns={2}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.url }} style={{ width: '100%', borderRadius: 15, margin: 7, flex: 1, height: 120 }} />
                )}
            />
        </View>
    )
}