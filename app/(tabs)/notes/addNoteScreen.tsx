import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import styles from "../tasks/styles";
import { IconSymbol } from "@/components/ui/IconSymbol";
export default function AddNoteScreen(){
    const navigateToBack = () => {
        router.replace("/notes");
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.content}>
                <Pressable onPress={navigateToBack} style={styles.addNoteBtn}>
                    <IconSymbol size={20} name="backward" color={'white'} style={styles.symbol} />
                    <ThemedText style={styles.linkText}>Go Back</ThemedText>
                </Pressable>
            </View>
        </ThemedView>
    );
}