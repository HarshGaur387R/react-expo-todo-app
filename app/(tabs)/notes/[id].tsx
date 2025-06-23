import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styles from "./styles";

interface NoteType {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
}

const NotePage = () => {
    const { id } = useLocalSearchParams();
    const [note, setNote] = useState<NoteType | undefined>(undefined);

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
                }
            } catch (error) {
                console.log('Failed to load notes: ', error);
            }
        }

        fetchNotes();
    }, [id])

    return (
        <ScrollView contentContainerStyle={styles.notePage}>
            <ThemedText type='title' style={{ paddingVertical: 10 }}>
                {note?.title}
            </ThemedText>

            <ThemedText style={styles.notePageContent}>
                {note?.content}
            </ThemedText>

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

export default NotePage