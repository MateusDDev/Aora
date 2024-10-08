import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

type FormFieldProps = {
    title: string,
    value: string,
    maxLength?: number,
    handleChangeText: (text: string) => void,
    placeholder?: string,
    otherStyles?: string,
    keyboardType?: string
}

const FormField = ({ title, value, maxLength, placeholder, handleChangeText, otherStyles }: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
                {title}
            </Text>
            <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary flex-row items-center">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    multiline={title !== 'Password'}
                    numberOfLines={3}
                    maxLength={maxLength ?? 120}
                    secureTextEntry={title === 'Password' && !showPassword}
                />

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            className="w-6 h-6"
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField