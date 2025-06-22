import React, { memo, useCallback } from "react";
import { Pressable, View } from "react-native";
import { ThemedText } from "./ThemedText";
import styles from "@/app/(tabs)/notes/styles";
import { Link } from "expo-router";
import { IconSymbol } from "./ui/IconSymbol";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NoteType {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
}

const Note = memo(function Note({ note, setNotes }: {
    note: NoteType;
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>
}) {

    const deleteNote = useCallback(async (_id: string) => {
        try {
            setNotes((prev) => {
                const updated = prev.filter((note) => note._id !== _id);
                AsyncStorage.setItem('notes', JSON.stringify(updated));
                return updated;
            });
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    }, [setNotes]); // or [todos] if using `todos` inside

    return (
        <View
            style={styles.mainContainer}
        >
            <Pressable style={styles.deleteBtn}
                onPress={() => { deleteNote(note._id) }} >
                <IconSymbol size={20} name="trash.fill" color={'white'} style={styles.symbol} />
            </Pressable>
            <View style={styles.noteContainer}>
                <View style={{ width: '100%' }}>
                    <ThemedText numberOfLines={1} style={styles.noteTitle}>{note.title}</ThemedText>
                    <ThemedText numberOfLines={5} style={styles.noteText} >{note.content}</ThemedText>
                </View>
                <View style={styles.noteFooter}>
                    <ThemedText style={styles.noteFooterDate}>
                        {`${note.createdAt.getDate().toString()}/${note.createdAt.getMonth().toString()}/${note.createdAt.getFullYear().toString()}`}
                    </ThemedText>
                    <Link
                        style={{ color: 'white', textDecorationLine: 'underline' }}
                        href={{
                            pathname: '/notes/[id]',
                            params: { id: note._id }
                        }}>View full</Link>
                </View>
            </View>
        </View>
    )
})

export default Note