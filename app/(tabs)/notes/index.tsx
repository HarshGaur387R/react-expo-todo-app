import Note from "@/components/Note";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import styles from "./styles";

interface NoteType {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
}

export default function Page() {
    const navigateToAddNote = () => {
        router.replace("/notes/addNoteScreen");
    };

    const [notes, setNotes] = useState<NoteType[]>([])

    const fetchNotes = useCallback(async () => {
        try {
            const fetchedNotes = await AsyncStorage.getItem('notes');
            if (fetchedNotes !== null) {
                const parsed = JSON.parse(fetchedNotes);
                const normalized = parsed.map((n: any) => ({
                    ...n,
                    createdAt: new Date(n.createdAt),
                }));
                setNotes(normalized);
            } else {
                setNotes([]);
            }
        } catch (error) {
            console.log('failed to load notes: ', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchNotes();
        }, [fetchNotes])
    );

    return (
        <ThemedView style={styles.container}>
            <View style={styles.content}>
                <Pressable onPress={navigateToAddNote} style={styles.addNoteBtn}>
                    <ThemedText style={styles.linkText}>Write Note</ThemedText>
                </Pressable>
            </View>

            <ScrollView
                style={styles.NotesListContainer}
                contentContainerStyle={styles.notesContent}
                showsVerticalScrollIndicator={false}
            >
                {
                    notes.map((n) => <Note note={n} setNotes={setNotes} key={n._id} />)
                }

            </ScrollView>
        </ThemedView>
    );
}