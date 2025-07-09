import React, { memo, useCallback } from "react";
import { Pressable, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";
import { IconSymbol } from "./ui/IconSymbol";
import styles from "@/app/(tabs)/notes/styles";
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
    }, [setNotes]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.noteContainer}>
                <View style={styles.noteHeader}>
                    <ThemedText numberOfLines={1} style={styles.noteTitle}>
                        {note.title}
                    </ThemedText>
                    <Pressable 
                        style={styles.deleteBtn}
                        onPress={() => { deleteNote(note._id) }}
                        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: true }}
                    >
                        <IconSymbol size={16} name="trash.fill" color={'white'} />
                    </Pressable>
                </View>
                
                <View style={styles.noteBody}>
                    <ThemedText numberOfLines={5} style={styles.noteText}>
                        {note.content}
                    </ThemedText>
                </View>
                
                <View style={styles.noteFooter}>
                    <ThemedText style={styles.noteFooterDate}>
                        {`${note.createdAt.getDate().toString().padStart(2, '0')}/${(note.createdAt.getMonth() + 1).toString().padStart(2, '0')}/${note.createdAt.getFullYear().toString()}`}
                    </ThemedText>
                    <Link
                        style={styles.viewFullLink}
                        href={{
                            pathname: '/notes/[id]',
                            params: { id: note._id }
                        }}>
                        View full
                    </Link>
                </View>
            </View>
        </View>
    )
})



export default Note