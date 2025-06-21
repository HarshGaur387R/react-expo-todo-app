import React, { memo } from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import styles from "@/app/(tabs)/notes/styles";
import { Link } from "expo-router";

interface NoteType {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
}

const Note = memo(function Note({ note }: {
    note: NoteType;
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>
}) {
    return (
        <Link
            style={styles.linkContainer}
            href={{
                pathname: '/notes/[id]',
                params: { id: note._id },
            }}>
            <View style={styles.noteContainer}>
                <View >
                    <ThemedText numberOfLines={1} style={styles.noteTitle}>{note.title}</ThemedText>
                    <ThemedText numberOfLines={5} style={styles.noteText} >{note.content}</ThemedText>
                </View>
                <ThemedText style={styles.noteFooter}>
                    {`${note.createdAt.getDate().toString()}/${note.createdAt.getMonth().toString()}/${note.createdAt.getFullYear().toString()}`}
                </ThemedText>
            </View>
        </Link>
    )
})

export default Note