import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function DoneScreen() {
    const router = useRouter();

    const navigateToPending = () => {
        router.replace("/tasks/pending");
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.content}>
                <Pressable onPress={navigateToPending} style={styles.link}>
                    <ThemedText style={styles.linkText}>Check Pending Tasks?</ThemedText>
                </Pressable>
                <ThemedText style={styles.text}>
                    Hello world from tasks/done
                </ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    link: {
        backgroundColor: 'violet',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    linkText: {
        color: 'white',
    },
    text: {
        marginTop: 8,
    }
});