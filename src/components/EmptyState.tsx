import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

type EmptyStateProps = {
    title: string,
    subtitle: string
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
    return (
        <View className='justify-center items-center px-4'>
            <Image
                className='w-[270px] h-[215px]'
                resizeMode='contain'
                source={images.empty}
            />
            <Text className='text-xl text-center font-psemibold text-white mt-2'>
                {title}
            </Text>
            <Text className='font-pmedium text-sm text-gray-100'>
                {subtitle}
            </Text>

            <CustomButton
                title='Create a video'
                handlePress={() => router.push('/create')}
                containerStyles='w-full my-5'
            />
        </View>
    )
}

export default EmptyState