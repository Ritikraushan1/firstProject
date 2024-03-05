import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser'
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);
    return (
        <View style={{ alignItems: 'center' }}>
            <Image style={styles.loginImage} source={require('../../../assets/Images/login.png')} />
            <View style={styles.subContainer}>
                <Text style={{ fontSize: 27, color: Colors.WHITE, textAlign: 'center' }}>Let's Find <Text style={{ fontWeight: 'bold' }}>Professional Cleaning and Repair</Text> Services</Text>
                <Text style={{ fontSize: 18, color: Colors.WHITE, textAlign: 'center', marginTop: 10 }}>Best app to find professionals near you</Text>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: Colors.PRIMARY }}>Let's Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginImage: {
        width: 230,
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
        borderWidth: 3,
        borderColor: Colors.BLACK,
        borderRadius: 20,
        marginHorizontal: 'auto',
    },
    subContainer: {
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        height: '70%',
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 99,
        marginTop: 35,
    }
})
