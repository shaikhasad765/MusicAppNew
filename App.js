import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SongDetailScreen from './screens/SongDetailScreen';
import SignInScreen from './screens/SignInScreen';
import { Image, View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import icon from './assets/images/icon.png';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Animatable from 'react-native-animatable';

const Stack = createStackNavigator();

function App() {
    // State to manage the visibility of the sign-out button
    const [showSignOutButton, setShowSignOutButton] = useState(false);

    // Initialize Google Sign-In
    useEffect(() => {
        GoogleSignin.configure();
    }, []);

    // Function to toggle the visibility of the sign-out button
    const toggleSignOutButton = () => {
        setShowSignOutButton(!showSignOutButton);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn">
                {/* Sign-In Screen */}
                <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />

                {/* Home Screen */}
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ route, navigation }) => ({
                        title: null,
                        // Custom header with animation
                        headerLeft: () => (
                            <Animatable.View style={styles.headerContainer} animation="slideInLeft" duration={700}>
                                <Image source={icon} style={styles.iconImage} />
                                <Text style={styles.header}>My Music</Text>
                            </Animatable.View>
                        ),
                        // Custom header with user info and sign-out button
                        headerRight: () => (
                            <Animatable.View style={styles.headerContainer}>
                                {route.params && route.params.user && (
                                    <Animatable.View animation="slideInRight" duration={1000}>
                                        <Text style={styles.userName}>{route.params.user.user.name}</Text>
                                    </Animatable.View>
                                )}
                                {route.params && route.params.user && (
                                    <Animatable.View style={styles.profilePictureContainer} animation="slideInRight" duration={1000}>
                                        <TouchableOpacity onPress={toggleSignOutButton}>
                                            <Image
                                                source={{ uri: route.params.user.user.photo }}
                                                style={styles.profilePicture}
                                            />
                                        </TouchableOpacity>
                                    </Animatable.View>
                                )}
                                {/* Render the sign-out button conditionally */}
                                {showSignOutButton && (
                                    <Animatable.View
                                        style={styles.signOutButton}
                                        animation="fadeIn" duration={700}
                                    >
                                        <TouchableOpacity
                                            onPress={async () => {
                                                try {
                                                    // Sign out from Google Sign-In
                                                    await GoogleSignin.signOut();
                                                    // Hide the sign-out button and navigate to the Sign-In screen
                                                    toggleSignOutButton();
                                                    navigation.navigate('SignIn');
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            }}>
                                            <Text style={styles.signOutButtonText}>Sign Out</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                )}
                            </Animatable.View>
                        ),
                    })}
                />

                {/* Song Detail Screen */}
                <Stack.Screen name="SongDetail" component={SongDetailScreen} options={{ title: 'YouTube' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// Styles for the components
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    profilePictureContainer: {
        marginRight: 10,
        marginLeft: 10,
        borderColor: '#D01273',
        borderWidth: 2,
        borderRadius: 15,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 18,
    },
    userName: {
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    iconImage: {
        width: 36,
        height: 36,
        marginRight: 10,
        marginLeft: 15,
    },
    signOutButton: {
        backgroundColor: '#D01273',
        borderRadius: 15,
        padding: 8,
        marginRight: 10,
        borderColor: 'whitesmoke',
    },
    signOutButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default App;
