import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function TasksLayout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackVisible: true,
                    animation: 'simple_push',
                }}
            >
                <Stack.Screen
                    name="pending"
                    options={{
                        title: 'Pending Tasks',
                    }}
                />
                <Stack.Screen
                    name="done"
                    options={{
                        title: 'Done Tasks',
                    }}
                />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
