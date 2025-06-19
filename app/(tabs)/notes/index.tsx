import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import styles from "../tasks/styles";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
export default function Page() {
    const navigateToAddNote = () => {
        router.replace("/notes/addNoteScreen");
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.content}>
                <Pressable onPress={navigateToAddNote} style={styles.addNoteBtn}>
                    <ThemedText style={styles.linkText}>Add Note</ThemedText>
                </Pressable>
            </View>
        </ThemedView>
    );
}