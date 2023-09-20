import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as Animatable from 'react-native-animatable';
import icon from '../assets/images/icon.png';
import backgroundImage from '../assets/images/signinwallpaper.png';
import GoogleIcon from '../assets/images/google.png';

const SignInScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null);

    // Initialize Google Sign-In
    useEffect(() => {
        GoogleSignin.configure();
    }, []);

    // Function to handle Google Sign-In
    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            setUserInfo(user); // Set user info to state
            navigation.navigate('Home', { user }); // Navigate to Home screen with user data
        } catch (error) {
            // Handle different Google Sign-In errors
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error);
            } else {
                console.log(error);
            }
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                {/* App Icon */}
                <Animatable.View style={styles.appIcon} animation="slideInLeft" duration={700}>
                    <Image source={icon} style={styles.iconImage} />
                    <Text style={styles.header}>My Music</Text>
                </Animatable.View>
                {/* Google Sign-In Button */}
                <TouchableOpacity
                    style={styles.googleSignInButton}
                    onPress={googleLogin}>
                    <Animatable.View
                        animation="tada"
                        duration={2000}
                        style={styles.signInButtonContent}>
                        <Animatable.View
                            animation="fadeIn"
                            duration={500}
                            style={styles.signInButtonContent}>
                            <Image
                                source={GoogleIcon}
                                style={styles.googleIcon}
                            />
                            <Text style={styles.signInButtonText}>Sign In With Google</Text>
                        </Animatable.View>
                    </Animatable.View>
                </TouchableOpacity>
                <View style={styles.footer}>
                    {/* Copyright notice */}
                    <Text style={styles.copyright}>© 2023 Asadullah Shaikh</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

// Styles for the components
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
    },
    googleSignInButton: {
        width: 192,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    appIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconImage: {
        width: 55,
        height: 55,
        marginRight: 10,
        marginLeft: -8,
    },
    signInButtonText: {
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
        color:'black',
        fontSize: 13,
    },
    signInButtonContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
    },
    copyright: {
        color: 'black',
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
});

export default SignInScreen;
