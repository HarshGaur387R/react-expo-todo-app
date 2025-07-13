import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, TextInputChangeEventData } from "react-native";
import styles from "./styles";
import { ThemedInput } from "@/components/ThemedInput";

interface NoteType {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
}

const NotePage = () => {
    const { id } = useLocalSearchParams();
    const [note, setNote] = useState<NoteType | undefined>(undefined);
    const [noteContent, setNoteContent] = useState<string | undefined>(note?.content);
    const [noteTitle, setNoteTitle] = useState<string | undefined>(note?.title);

    const handleTitleOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setNoteTitle(e.nativeEvent.text);
    }

    const handleContentOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setNoteContent(e.nativeEvent.text);
    }

    const handleOnEditClick = async () => {
        if (noteContent && noteTitle) {
            if (noteContent?.length < 1 || noteTitle.length < 1) return;
        }

        try {
            // const fetchedNotes = await AsyncStorage.getItem('notes');

            // if (fetchedNotes !== null) {
            //     const parsed = JSON.parse(fetchedNotes);
            //     await AsyncStorage.setItem('notes', JSON.stringify([...parsed, newNote]))

            //     router.replace("/notes");
            //     return;
            // }

            // await AsyncStorage.setItem('notes', JSON.stringify([newNote]));
            // router.replace("/notes");

        } catch (error) {
            console.log('Failed to save notes:', error);
        }
    }

    useEffect(() => {
        async function fetchNotes() {
            try {
                const fetchedNotes = await AsyncStorage.getItem('notes');
                if (fetchedNotes !== null) {
                    const parsedNotes = await JSON.parse(fetchedNotes);
                    const normalized: NoteType[] = parsedNotes.map((n: NoteType) => {
                        return {
                            ...n,
                            createdAt: new Date(n.createdAt)
                        }
                    })

                    const n: NoteType | undefined = normalized.find((n) => {
                        return n._id === id
                    })

                    setNote(n);
                    setNoteContent(n?.content);
                    setNoteTitle(n?.title);
                }
            } catch (error) {
                console.log('Failed to load notes: ', error);
            }
        }

        fetchNotes();
    }, [id])

    return (
        <ScrollView contentContainerStyle={styles.notePage}>

            <Pressable style={({ pressed }) => [
                styles.button,
                {
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }]
                }]}
                android_ripple={{ color: '#cccccc', radius: 20 }}
                onPress={handleOnEditClick}>
                <ThemedText style={styles.linkText}>Edit</ThemedText>
            </Pressable>

            <ThemedInput
                autoCorrect={false}
                onChange={handleTitleOnChange}
                value={noteTitle}
                placeholder="Write Title"
                style={[customStyle.noteTitle, { minHeight: 50, maxHeight: 50 }]}
                placeholderTextColor={'gray'}
                maxLength={50}
            />


            <ThemedInput
                autoCorrect={false}
                onChange={handleContentOnChange}
                value={noteContent}
                placeholder="Write Your Note Here."
                style={[customStyle.noteContent, { minHeight: 150 }]}
                placeholderTextColor={'gray'}
                multiline={true}
                textAlignVertical="top"
            />

            {/* <ThemedText style={styles.notePageContent}>
                {note?.content}
            </ThemedText> */}

            <ThemedText style={styles.notePageFooterDate}>
                {`${note?.createdAt.getDate().toString()}/${note?.createdAt.getMonth().toString()}/${note?.createdAt.getFullYear().toString()}`}
            </ThemedText>

            <ThemedText style={styles.notePageFooterTime}>
                {note
                    ? `${note.createdAt.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}`
                    : ""}
            </ThemedText>
        </ScrollView>
    )
}

const customStyle = StyleSheet.create({
    noteContent: {
        borderColor: '#888',
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        padding: 10,
        // backgroundColor:"#d6d3d3",
        borderLeftWidth: 4,
        borderLeftColor: 'violet'
    },
    noteTitle: {
        borderColor: '#888',
        paddingHorizontal: 0,
        paddingVertical: 10,
        fontSize: 32,
        fontWeight:'bold'
    }
})

export default NotePage