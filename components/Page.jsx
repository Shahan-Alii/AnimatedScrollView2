import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

import { RadialGradient } from 'react-native-gradients';

const { height, width } = Dimensions.get('window');

const images = {
    bannana: require('../assets/bannana.png'),
    bannana1: require('../assets/bannana1.png'),
    greenapple: require('../assets/greenapple.png'),
    greenapple1: require('../assets/greenapple1.png'),
    strawberry: require('../assets/strawberry.png'),
    strawberry1: require('../assets/strawberry1.png'),
    caramel: require('../assets/caramel.png'),
    caramel1: require('../assets/caramel1.png'),
};

const positions = [
    { top: 10, left: 120, rotation: -115 },
    { top: 130, left: 240, rotation: 30 },
    { top: 45, left: 15, rotation: 45 },
    { top: 340, left: 10, rotation: 10 },
    { top: 576, left: 20, rotation: 75 },
    { top: 490, left: 55, rotation: 90 },
    { top: 450, left: 265, rotation: 105 },
    { top: 150, left: 116, rotation: 15 },
    { top: 530, left: 178, rotation: -75 },
    { top: 690, left: 200, rotation: -50 },
];

const Page = ({ item, index, translateX }) => {
    const colorList = [
        { offset: '10%', color: item.colors[0], opacity: '1' },
        { offset: '100%', color: item.colors[1], opacity: '0.8' },
    ];

    const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
    ];

    const rImgStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            inputRange,
            [-2.5, 1, -2.5],
            Extrapolate.CLAMP
        );
        const rotate = interpolate(
            translateX.value,
            inputRange,
            [-180, 0, 180],
            Extrapolate.CLAMP
        );

        const translateXImg = interpolate(
            translateX.value,
            inputRange,
            [width * 0.5 - 120, 0, width * 1.7],
            Extrapolate.CLAMP
        );

        const translateYImg = interpolate(
            translateX.value,
            inputRange,
            [height * 1.9, 0, -height * 1.2],
            Extrapolate.CLAMP
        );

        return {
            opacity,
            rotate,
            transform: [
                { translateX: translateXImg },
                { translateY: translateYImg },
                { rotate: `${rotate}deg` },
            ],
            zIndex: 2,
        };
    });

    const rTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            inputRange,
            [-0.5, 1, -0.5],
            Extrapolate.CLAMP
        );
        const translateY = interpolate(
            translateX.value,
            inputRange,
            [-170, 0, 110],
            Extrapolate.CLAMP
        );
        // const scaleY = interpolate(
        //     translateX.value,
        //     inputRange,
        //     [2.5, 2.5, 2.5],
        //     Extrapolate.CLAMP
        // );

        return {
            opacity,
            transform: [{ translateY }, { scaleY: 2.5 }],
        };
    });

    const rFruits = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [
                (index - 1) * width,
                index * width - 150,
                index * width,
                index * width + 150,
                (index + 1) * width,
            ],
            [0, 0, 1, 0, 0],
            Extrapolate.CLAMP
        );

        return {
            opacity,
        };
    });

    return (
        <View style={[styles.container]}>
            <View style={[styles.gradientBg]}>
                <RadialGradient
                    x="50%"
                    y="50%"
                    rx="50%"
                    ry="25%"
                    colorList={colorList}
                />
            </View>

            <View style={styles.fruitsContainer}>
                {Array(10)
                    .fill(null)
                    .map((_, i) => {
                        const { top, left, rotation } = positions[i];
                        return (
                            <Animated.Image
                                key={i}
                                source={images[item.images[1]]}
                                style={[
                                    styles.fruits,
                                    {
                                        position: 'absolute',
                                        top,
                                        left,

                                        transform: [
                                            { rotate: `${rotation}deg` },
                                        ],
                                    },
                                    rFruits,
                                ]}
                            />
                        );
                    })}
            </View>

            <View style={[styles.textContainer]}>
                <Animated.Text style={[styles.title, rTextStyle]}>
                    {item.name}
                </Animated.Text>
            </View>

            <Animated.Image
                source={images[item.images[0]]}
                style={[styles.img, rImgStyle]}
            />
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    img: {
        height: 250,
        width: 250,
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.34,
        position: 'absolute',
        textAlign: 'center',
        maxWidth: width * 0.9,
    },
    title: {
        fontSize: 48,
        fontWeight: '900',
        position: 'absolute',
        top: 0,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 1,
    },
    fruitsContainer: {
        height: height,
        width: width,
        position: 'absolute',
    },
    fruits: {
        height: 60,
        width: 60,
        position: 'relative',
        zIndex: 10,
    },
    gradientBg: {
        position: 'absolute',
        width: width,
        height: height,
        zIndex: -2,
    },
});
