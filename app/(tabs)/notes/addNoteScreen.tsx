import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
import React, { useState } from "react";
import { NativeSyntheticEvent, Pressable, ScrollView, TextInputChangeEventData, View } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedInput } from "@/components/ThemedInput";

interface NoteType {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
}

export default function AddNoteScreen() {

    const [textState, setText] = useState<string>(''); // For title
    const [content, setContent] = useState<string>('');


    const func = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setText(e.nativeEvent.text);
    }

    const handleContentOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setContent(e.nativeEvent.text);
    }

    const handleOnSave = async () => {
        if (content?.length < 1 || textState.length < 1) return;
        try {
            const randomStr = Math.random().toString(36).slice(2, 11);
            const newNote: NoteType = {
                _id: Date.now().toString() + randomStr,
                createdAt: new Date(),
                content: content,
                title: textState
            }

            const fetchedNotes = await AsyncStorage.getItem('notes');

            if (fetchedNotes !== null) {
                const parsed = JSON.parse(fetchedNotes);
                await AsyncStorage.setItem('notes', JSON.stringify([...parsed, newNote]))

                router.replace("/notes");
                return;
            }

            await AsyncStorage.setItem('notes', JSON.stringify([newNote]));
            router.replace("/notes");

        } catch (error) {
            console.log('Failed to save notes:', error);
        }
    }

    const handleOnDiscard = () => {
        setContent('');
        setText('');
    }

    const navigateToBack = () => {
        router.replace("/notes");
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Pressable onPress={navigateToBack} style={styles.addNoteBtn}>
                        <IconSymbol size={20} name="backward" color={'white'} style={styles.symbol} />
                        <ThemedText style={styles.linkText}>Go Back</ThemedText>
                    </Pressable>
                </View>
                <View style={[styles.inputsContainer, { paddingTop: 10 }]}>
                    <ThemedInput autoCorrect={false} onChange={func} value={textState} placeholder="Write Title" style={[styles.input, { minHeight: 50, maxHeight: 50 }]} placeholderTextColor={'gray'} maxLength={50} />

                    <ThemedInput
                        autoCorrect={false}
                        onChange={handleContentOnChange}
                        value={content}
                        placeholder="Write Your Note Here."
                        style={[styles.input, { minHeight: 150 }]}
                        placeholderTextColor={'gray'}
                        multiline={true}
                        textAlignVertical="top"
                    />
                </View>
                <View style={[styles.containerForButtons, { paddingHorizontal: 10, paddingTop: 15 }]}>
                    <Pressable style={({ pressed }) => [
                        styles.button,
                        {
                            opacity: pressed ? 0.7 : 1,
                            transform: [{ scale: pressed ? 0.97 : 1 }]
                        }]}
                        android_ripple={{ color: '#cccccc', radius: 20 }}
                        onPress={handleOnSave}>
                        <ThemedText style={styles.linkText}>Save</ThemedText>
                    </Pressable>

                    <Pressable style={[styles.button, { backgroundColor: 'red' }]}
                        onPress={handleOnDiscard}>
                        <ThemedText style={styles.linkText}>Discard</ThemedText>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}