import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import albumData from '../AlbumData/albumData';
import HomeWallpaper from '../assets/images/HomeWallpaper.jpg';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({ navigation }) => {

    // Render each item in the ScrollView
    const renderAlbums = () => {
        return albumData.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('SongDetail', { youtubeLink: item.youtubeLink })}>
                <Animatable.View style={styles.albumContainer} animation="slideInRight" duration={1000}>
                    <Image source={{ uri: item.coverImage }} style={styles.albumImage} />
                    <Animatable.View style={styles.textContainer} animation="tada" duration={1500}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Album:</Text>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Artist:</Text>
                            <Text style={styles.artist}>{item.artist}</Text>
                        </View>
                    </Animatable.View>
                </Animatable.View>
            </TouchableOpacity>
        ));
    };

    return (
        <ImageBackground source={HomeWallpaper} style={styles.backgroundImage}>
            <View style={styles.container}>
                {/* FlatList to display the album data */}
                {/* <FlatList
                    data={albumData}
                    renderItem={renderAlbums}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                /> */}

                <ScrollView 
                    horizontal={false} // Change to true for horizontal Album View 
                    showsHorizontalScrollIndicator={false}>
                    {renderAlbums()}
                </ScrollView>
                
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
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    albumContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginRight: 15,
        width: 350,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
    },
    albumImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
        marginRight: 5,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    labelContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 5,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
    artist: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
