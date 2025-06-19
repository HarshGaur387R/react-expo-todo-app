import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Todo from "@/components/Todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import styles from "./styles";
import type TodosType from "./todosType";

export default function DoneScreen() {
    const router = useRouter();
    const [todos, setTodos] = useState<TodosType[]>([])

    useEffect(() => {
        async function fetchTodos() {
            try {
                const fetchedTodos = await AsyncStorage.getItem('Todos');
                if (fetchedTodos !== null) {
                    const parsed = JSON.parse(fetchedTodos);
                    const normalized = parsed.map((t: any) => ({
                        ...t,
                        isChecked: Boolean(t.isChecked),
                        createdAt: new Date(t.createdAt),
                        checkedAt: t.checkedAt ? new Date(t.checkedAt) : undefined,
                    }));
                    setTodos(normalized);
                }
            } catch (error) {
                console.error('Failed to load todos:', error);
            }
        }
        fetchTodos();
    }, []);


    const navigateToPending = () => {
        router.replace("/tasks/pending");
    };

    if (todos.length === 0) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>
                    Loading....
                </ThemedText>
            </ThemedView>
        )
    }

    return (
        <ThemedView style={styles.container}>
            <View style={[styles.content, {paddingBottom: 16}]}>
                <Pressable onPress={navigateToPending} style={styles.link}>
                    <ThemedText style={styles.linkText}>Check pending Tasks?</ThemedText>
                </Pressable>
            </View>

            <ScrollView
                style={styles.TodosListContainer}
                contentContainerStyle={styles.todosContent}
                showsVerticalScrollIndicator={false}
            >
                {
                    todos?.filter((t) => t.isChecked).map((t) => <Todo todo={t} setTodos={setTodos} key={t._id} />)
                }
            </ScrollView>
        </ThemedView>
    );
}