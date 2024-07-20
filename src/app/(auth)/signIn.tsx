import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/writeUser'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmiting] = useState(false);
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields');
            return;
        }

        setIsSubmiting(true);

        try {
            await signIn(form.email, form.password);

            const currentUser = await getCurrentUser();

            setUser(currentUser);
            setIsLoggedIn(true);

            Alert.alert('Success', 'User signed in successfully')
            router.replace('/home');
        } catch (error) {
            Alert.alert('Error', error.message);
            throw new Error(error.message);
        } finally {
            setIsSubmiting(false);
        }
    }

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 w-full justify-center px-4 my-6">
                    <Image
                        className="w-[115px] h-[35px]"
                        source={images.logo}
                        resizeMode='contain'
                    />

                    <Text className="text-2xl text-white mt-10 font-psemibold">
                        Log in to Aora
                    </Text>

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({
                            ...form,
                            email: e
                        })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({
                            ...form,
                            password: e
                        })}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title='Sign In'
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link href="/signUp" className='text-lg font font-psemibold text-secondary'>
                            Sing Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn