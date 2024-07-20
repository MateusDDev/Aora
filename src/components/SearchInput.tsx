import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

type SearchInputProps = {
    initialQuery?: string,
}

const SearchInput = ({ initialQuery }: SearchInputProps) => {
    const pathname = usePathname();
    const [query, setQuery] = useState('' || initialQuery);

    return (
        <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary flex-row items-center space-x-4">
            <TextInput
                className="text-base m-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder='Search for a video topic'
                placeholderTextColor="#CDCDE0"
                onChangeText={(e) => setQuery(e)}
            />

            <TouchableOpacity onPress={() => {
                if (!query) return Alert.alert('Missing query', 'Please input something to search')

                if (pathname.startsWith('/search')) router.replace(`/search/${query}`)
                else router.push(`/search/${query}`)
            }}>
                <Image
                    className='w-5 h-5'
                    source={icons.search}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput