import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { VideoType } from '../../types/VideoTypes'
import VideoCard from '../../components/VideoCard'
import { getUserVideos, signOut } from '../../lib/writeUser'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const { data: videos, refetch } = useAppwrite(
        () => getUserVideos(user.$id)
    );

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);
        router.replace('/signIn');
    }

    return (
        <SafeAreaView className='bg-primary flex-1'>
            <FlatList
                data={videos}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mt-6 mb-12 px-4 pt-2'>
                        <TouchableOpacity
                            className='absolute top-0 right-0 mr-4 mt-2'
                            onPress={logout}
                        >
                            <Image
                                className='w-6 h-6'
                                source={icons.logout}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>

                        <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
                            <Image
                                className='w-[90%] h-[90%] rounded-lg'
                                source={{ uri: user?.avatar }}
                                resizeMode='cover'
                            />
                        </View>

                        <InfoBox
                            title={user?.username}
                            containerStyles='mt-5'
                            titleStyles='text-lg'
                        />

                        <View className='mt-5 flex-row'>
                            <InfoBox
                                title={videos.length || 0}
                                subtitle='Videos'
                                containerStyles='mr-10'
                                titleStyles='text-xl'
                            />
                            <InfoBox
                                title="1.2k"
                                subtitle='Followers'
                                titleStyles='text-xl'
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Videos Found'
                        subtitle='No videos found for this search query'
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default Profile