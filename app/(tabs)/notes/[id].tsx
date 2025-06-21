import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const NotePage = () => {
    const { id } = useLocalSearchParams();

    return (
        <ThemedView>
            <ThemedText>
                note id : {id}
            </ThemedText>
        </ThemedView>
    )
}

export default NotePage