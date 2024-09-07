import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Page from './components/Page';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Font } from 'expo';

const { width } = Dimensions.get('window');

const data = [
    {
        key: '1',
        name: 'BANANA',
        images: ['bannana', 'bannana1'],
        colors: ['#f8e68e', '#eaba41'],
    },

    {
        key: '2',
        name: 'GREENAPPLE',
        images: ['greenapple', 'greenapple1'],
        colors: ['#c5f095', '#71b609'],
    },
    {
        key: '3',
        name: 'STRAWBERRY',
        images: ['strawberry', 'strawberry1'],
        colors: ['#e293ab', '#eb3e77'],
    },
    {
        key: '4',
        name: 'CARAMEL',
        images: ['caramel', 'caramel1'],
        colors: ['#edc68c', '#ec9a17'],
    },
];

export default function App() {
    const translateX = useSharedValue(0);
    const [findex, setFindex] = useState(3);
    const scrollRef = useRef(null);

    const scrollHandler = (event) => {
        translateX.value = event.nativeEvent.contentOffset.x;
    };

    const scrollToIndex = (index) => {
        setFindex(index);
        scrollRef.current?.scrollTo({ x: index * width, animated: true });
    };

    const onMomentumScrollEnd = (event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setFindex(newIndex);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                onMomentumScrollEnd={onMomentumScrollEnd}
                showsHorizontalScrollIndicator={false}
            >
                {data.map((item, index) => (
                    <Page
                        key={item.key}
                        item={item}
                        translateX={translateX}
                        index={index}
                    />
                ))}
            </ScrollView>

            <View style={styles.btns}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        if (findex > 0) {
                            scrollToIndex(findex - 1);
                        }
                    }}
                >
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={data[findex].colors[0]}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        if (findex < data.length - 1) {
                            scrollToIndex(findex + 1);
                        }
                    }}
                >
                    <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={data[findex].colors[0]}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btns: {
        position: 'absolute',
        bottom: 40,
        display: 'flex',
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    btn: {
        backgroundColor: '#ffffff',
        padding: 8,
        borderRadius: 50,
        borderColor: 'grey',
        borderWidth: StyleSheet.hairlineWidth,
    },
});
