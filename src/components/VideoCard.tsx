import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { VideoType } from '../types/VideoTypes'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'

type VideoCardProps = {
    video: VideoType
}

const VideoCard = (
    { video: { title, thumbnail, video, creator }
    }: VideoCardProps) => {

    const [play, setPlay] = useState(false);

    return (
        <>
            {creator && (
                <View className='flex-col items-center px-4 mb-14'>
                    <View className='flex-row gap-3 items-start'>
                        <View className='justify-center items-center flex-row flex-1'>
                            <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
                                <Image
                                    className='w-full h-full rounded-lg'
                                    source={{ uri: creator.avatar }}
                                    resizeMode='cover'
                                />
                            </View>

                            <View className='justify-center flex-1 ml-3 gap-y-1'>
                                <Text className='text-white font-psemibold text-sm' numberOfLines={1} >
                                    {title}
                                </Text>
                                <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>
                                    {creator.username}
                                </Text>
                            </View>
                        </View>

                        <View className='pt-2'>
                            <Image
                                className='w-5 h-5'
                                source={icons.menu}
                                resizeMode='contain'
                            />
                        </View>
                    </View>

                    {play ? (
                        <Video
                            className='w-full h-60 rounded-xl mt-3'
                            // source={{ uri: item.video }}
                            source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
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
                            className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                            activeOpacity={0.7}
                            onPress={() => setPlay(true)}
                        >
                            <Image
                                className='w-full h-full rounded-xl mt-3'
                                source={{ uri: thumbnail }}
                                resizeMode='cover'
                            />
                            <Image
                                className='w-12 h-12 absolute'
                                source={icons.play}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </>
    )
}

export default VideoCard