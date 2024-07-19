import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

type SearchInputProps = {
    title: string,
    value: string,
    handleChangeText: (text: string) => void,
}

const SearchInput = ({ title, value, handleChangeText }: SearchInputProps) => {

    return (
        <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary flex-row items-center space-x-4">
            <TextInput
                className="text-base m-0.5 text-white flex-1 font-pregular"
                value={value}
                placeholder='Search for a video topic'
                placeholderTextColor="#7B7B8B"
                onChangeText={handleChangeText}
            />

            <TouchableOpacity>
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