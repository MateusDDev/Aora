import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);

        // Logic to verify if new videos were posted

        setRefreshing(false);
    }

    return (
        <SafeAreaView className='bg-primary flex-1'>
            <FlatList
                data={[]}
                keyExtractor={(item) => item.id as unknown as string}
                renderItem={({ item }) => (
                    <Text className='text-3xl text-white'>
                        {item.id}
                    </Text>
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4'>
                        <View className='items-start justify-between flex-row mb-6'>
                            <View>
                                <Text className='font-pmedium text-sm text-gray-100'>
                                    Welcome Back
                                </Text>
                                <Text className='text-2xl font-psemibold text-white'>
                                    Spec
                                </Text>
                            </View>

                            <View className='mt-1.5'>
                                <Image
                                    className='w-9 h-10'
                                    resizeMode='contain'
                                    source={images.logoSmall}
                                />
                            </View>
                        </View>

                        <SearchInput

                        />

                        <View className='w-full flex-1 pt-10 pb-8'>
                            <Text className='text-gray-100 text-lg font-pregular mb-3'>
                                Latest Videos
                            </Text>

                            <Trending
                                posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Videos Found'
                        subtitle='Be the first one to upload a video'
                    />
                )}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            />
        </SafeAreaView>
    )
}

export default Home