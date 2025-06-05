import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const CameraScreen = () => {
    const [isFlashOn, setIsFlashOn] = useState(false);
    const [isFrontCamera, setIsFrontCamera] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cameraPreview}>
                {/* Camera preview will be implemented with react-native-camera */}
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Camera Preview</Text>
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => setIsFlashOn(!isFlashOn)}>
                    <Icon
                        name={isFlashOn ? 'flash' : 'flash-off'}
                        size={24}
                        color={COLORS.white}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.captureButton}>
                    <View style={styles.captureButtonInner} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => setIsFrontCamera(!isFrontCamera)}>
                    <Icon
                        name="camera-reverse"
                        size={24}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.modes}>
                <TouchableOpacity style={[styles.modeButton, styles.activeMode]}>
                    <Icon name="camera" size={24} color={COLORS.white} />
                    <Text style={styles.modeText}>Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modeButton}>
                    <Icon name="videocam" size={24} color={COLORS.white} />
                    <Text style={styles.modeText}>Video</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    cameraPreview: {
        flex: 1,
        backgroundColor: COLORS.darkGray,
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.white,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: SIZES.base * 2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    controlButton: {
        padding: SIZES.base,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.white,
    },
    modes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: SIZES.base * 2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.base,
        opacity: 0.7,
    },
    activeMode: {
        opacity: 1,
    },
    modeText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.white,
        marginLeft: SIZES.base,
    },
});

export default CameraScreen; 