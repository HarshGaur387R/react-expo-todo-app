import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function NotesLayout() {
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
                    name="index"
                    options={{
                        title: 'Notes',
                    }}
                />
                <Stack.Screen
                    name="addNoteScreen"
                    options={{
                        title: 'Add a note',
                    }}
                />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
