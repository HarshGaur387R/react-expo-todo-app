// app/(tabs)/notes/[id].tsx

import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
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
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteContent, setNoteContent] = useState<string>("");
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const autoSaveNote = async (updatedTitle: string, updatedContent: string) => {
        try {

            if (!updatedTitle) return;

            const fetchedNotes = await AsyncStorage.getItem("notes");
            if (!fetchedNotes || !note) return;

            const parsed: NoteType[] = JSON.parse(fetchedNotes);
            const index = parsed.findIndex((n) => n._id === note._id);
            if (index === -1) return;

            parsed[index] = {
                ...parsed[index],
                title: updatedTitle,
                content: updatedContent,
            };

            await AsyncStorage.setItem("notes", JSON.stringify(parsed));
        } catch (error) {
            console.log("Failed to auto-save note:", error);
        }
    };

    useEffect(() => {
        async function fetchNoteById() {
            try {
                const stored = await AsyncStorage.getItem("notes");
                if (!stored) return;

                const parsed: NoteType[] = JSON.parse(stored).map((n: NoteType) => ({
                    ...n,
                    createdAt: new Date(n.createdAt),
                }));

                const found = parsed.find((n) => n._id === id);
                if (found) {
                    setNote(found);
                    setNoteTitle(found.title);
                    setNoteContent(found.content);
                }
            } catch (err) {
                console.log("Failed to load note:", err);
            }
        }

        fetchNoteById();
    }, [id]);

    // Debounce & Auto-save when noteTitle or noteContent changes
    useEffect(() => {
        if (!note) return;

        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
            autoSaveNote(noteTitle, noteContent);
        }, 500); // Adjust delay if needed

        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [noteTitle, noteContent]);

    return (
        <ScrollView contentContainerStyle={styles.notePage}>
            <ThemedInput
                autoCorrect={false}
                onChange={(e) => setNoteTitle(e.nativeEvent.text)}
                value={noteTitle}
                placeholder="Write Title"
                style={[customStyle.noteTitle, { minHeight: 50, maxHeight: 50 }]}
                placeholderTextColor={"gray"}
                maxLength={50}
            />

            <ThemedInput
                autoCorrect={false}
                onChange={(e) => setNoteContent(e.nativeEvent.text)}
                value={noteContent}
                placeholder="Write Your Note Here."
                style={[customStyle.noteContent, { minHeight: 150 }]}
                placeholderTextColor={"gray"}
                multiline
                textAlignVertical="top"
            />

            <ThemedText style={styles.notePageFooterDate}>
                {note
                    ? `${note.createdAt.getDate()}/${note.createdAt.getMonth() + 1}/${note.createdAt.getFullYear()}`
                    : ""}
            </ThemedText>

            <ThemedText style={styles.notePageFooterTime}>
                {note
                    ? note.createdAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })
                    : ""}
            </ThemedText>
        </ScrollView>
    );
};

const customStyle = StyleSheet.create({
    noteContent: {
        borderColor: "#888",
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        borderLeftWidth: 4,
        borderLeftColor: "violet",
    },
    noteTitle: {
        borderColor: "#888",
        paddingHorizontal: 0,
        paddingVertical: 10,
        fontSize: 32,
        fontWeight: "bold",
    },
});

export default NotePage;
