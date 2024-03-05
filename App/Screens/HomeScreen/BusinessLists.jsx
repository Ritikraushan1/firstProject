import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalAPI from '../../Utils/GlobalAPI'
import Heading from '../../Components/Heading';
import BusinessListItemSmall from './BusinessListItemSmall';

export default function BusinessLists() {

    const [businessLists, setBusinessLists] = useState([]);

    useEffect(() => {
        getBusinessLists();
    }, [])
    const getBusinessLists = () => {
        GlobalAPI.getBusinessLists().then(resp => {
            console.log(resp);
            setBusinessLists(resp?.businessLists);
        })
    }
    return (
        <View style={{ marginTop: 10 }}>
            <Heading text={'Business Lists'} isViewAll={true} />
            <FlatList
                data={businessLists}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{ marginRight: 10 }}>
                        <BusinessListItemSmall business={item} />
                    </View>
                )}
            />
        </View>
    )
}