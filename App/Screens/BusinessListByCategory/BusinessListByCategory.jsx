import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalAPI from '../../Utils/GlobalAPI';
import BusinessListItem from './BusinessListItem';

export default function BusinessListByCategory() {
    const param = useRoute().params;
    const navigation = useNavigation();
    const [businessList, setBusinessList] = useState([]);
    useEffect(() => {
        console.log("category", param.category);
        param && getBusinessByCategory()
    }, [param])

    const getBusinessByCategory = () => {
        GlobalAPI.getBusinessListByCategory(param.category).then(resp => {
            console.log(resp?.businessLists);
            setBusinessList(resp?.businessLists);
        })
    }
    return (
        <View style={{ padding: 20, paddingTop: 20 }}>
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                <FontAwesome name="arrow-circle-left" size={30} color={Colors.BLACK} />
                <Heading text={param?.category} />
            </TouchableOpacity>
            {businessList?.length > 0 ? <FlatList
                data={businessList}
                renderItem={({ item, index }) => (
                    <BusinessListItem business={item} />
                )}
                style={{ marginTop: 10 }}
            /> : <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center', marginTop: '20%' }}>No Business Listing Found</Text>}
        </View>
    )
}