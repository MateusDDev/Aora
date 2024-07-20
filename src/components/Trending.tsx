import { FlatList, ImageStyle, TextStyle, ViewStyle, TouchableOpacity, ImageBackground, Image, ViewToken } from 'react-native'
import React, { useState } from 'react'
import { VideoType } from '../types/VideoTypes'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'

type TrendingItemProps = {
    activeItem: VideoType,
    item: VideoType
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
    const [play, setPlay] = useState(false);

    const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
        0: {
            scaleX: 0.9,
            scaleY: 0.9
        },
        1: {
            scaleX: 1.07,
            scaleY: 1.07
        }
    }
    const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
        0: {
            scaleX: 1.07,
            scaleY: 1.07
        },
        1: {
            scaleX: 0.9,
            scaleY: 0.9
        }
    }

    return (
        <Animatable.View
            className='mr-4 px-2'
            animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Video
                    className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
                    source={{ uri: item.video }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.isLoaded && status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                    onFullscreenUpdate={async ({ fullscreenUpdate }) => {
                        if (fullscreenUpdate === 0)
                            await ScreenOrientation.unlockAsync();
                        else if (fullscreenUpdate === 2)
                            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
                    }}
                />
            ) : (
                <TouchableOpacity
                    className='relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                        source={{ uri: item.thumbnail }}
                        resizeMode='cover'
                    />

                    <Image
                        className='w-12 h-12 absolute'
                        source={icons.play}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

type TrendingProps = {
    videos: VideoType[],
}

const Trending = ({ videos }: TrendingProps) => {
    const [activeItem, setActiveItem] = useState<VideoType>(videos[1])

    const viewableItemsChanged = (e: { viewableItems: ViewToken<VideoType>[] }) => {
        if (e.viewableItems.length > 0) {
            setActiveItem(e.viewableItems[0].item)
        }
    }

    return (
        <FlatList
            data={videos}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{ x: 170, y: 170 }}
            horizontal
        />
    )
}

export default Trending