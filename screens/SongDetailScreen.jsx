import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import WebView from 'react-native-webview';
import albumData from '../AlbumData/albumData';
import * as Animatable from 'react-native-animatable';

const SongDetailScreen = ({ route }) => {
    const { youtubeLink } = route.params;

    // Find the album details based on the youtubeLink
    const albumDetails = albumData.find((album) => album.youtubeLink === youtubeLink);

    // Extract album name and artist name from albumDetails
    const albumName = albumDetails ? albumDetails.title : '';
    const artistName = albumDetails ? albumDetails.artist : '';

    // Define a custom HTML string to embed the YouTube video using the iframe API
    const youtubeEmbedHtml = `
        <html>
        <body style="margin:0;padding:20;">
            <iframe
                width="100%"
                height="80%"
                src="https://www.youtube.com/embed/${youtubeLink}"
                frameborder="0"
                allowfullscreen
            ></iframe>
        </body>
        </html>
    `;

    return (
        <Animatable.View style={styles.container} animation="fadeIn" duration={1000}>
            <Animatable.View style={styles.songDetails} animation="slideInUp" duration={1000}>
                {/* Display Album Name */}
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Album:</Text>
                    <Text style={styles.albumName}>{albumName}</Text>
                </View>

                {/* Display Artist Name */}
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Artist:</Text>
                    <Text style={styles.artistName}>{artistName}</Text>
                </View>
            </Animatable.View>

            {/* Display YouTube Video */}
            <WebView
                source={{ html: youtubeEmbedHtml }}
                style={styles.webView}
            />
        </Animatable.View>
    );
};

// Styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
        padding: 10,
    },

    webView: {
        flex: 1,
        margin: 5,
        borderRadius: 20,
    },

    labelContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 20,
        color: 'black',
    },

    albumName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },

    artistName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },

    label: {
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        marginTop: 10,
    },

    songDetails: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: 'black',
        backgroundColor: 'whitesmoke',
        borderRadius: 20,
    },
});

export default SongDetailScreen;
