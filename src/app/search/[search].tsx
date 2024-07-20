import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { VideoType } from '../../types/VideoTypes'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
import { searchPosts } from '../../lib/writeVideo'

const Search = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { search } = useLocalSearchParams();
    const { data: videos, refetch } = useAppwrite(
        () => searchPosts(search as string)
    );

    console.log(search, videos);


    useEffect(() => {
        refetch();
    }, [search])

    return (
        <SafeAreaView className='bg-primary flex-1'>
            <FlatList
                data={videos as VideoType[]}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4'>
                        <Text className='font-pmedium text-sm text-gray-100'>
                            Search Results
                        </Text>
                        <Text className='text-2xl font-psemibold text-white'>
                            {search}
                        </Text>

                        <View className='mt-6 mb-8'>
                            <SearchInput initialQuery={search as string} />
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

export default Search