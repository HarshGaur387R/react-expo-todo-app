import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Todo from "@/components/Todo";
import { IconSymbol } from "@/components/ui/IconSymbol";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, ScrollView, TextInputChangeEventData, View } from "react-native";
import styles from "./styles";
import type TodosType from './todosType';
import { ThemedInput } from "@/components/ThemedInput";

export default function Page() {
    const router = useRouter();
    const [textState, setText] = useState<string>('');
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

    // function to handle on change event & update text state.
    const func = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setText(e.nativeEvent.text);
    }

    const navigateToDone = () => {
        router.replace("/(tasks)/done");
    };

    const addTodo = async (content: string) => {
        if (textState.length < 1) return;

        const randomStr = Math.random().toString(36).slice(2, 11);
        const newTodo: TodosType = {
            content: content,
            isChecked: false, // By default 'isChecked' Value is false.
            createdAt: new Date(),
            _id: Date.now().toString() + randomStr
        }

        try {
            await AsyncStorage.setItem('Todos', JSON.stringify([...todos, newTodo]));
            setTodos((prev) => {
                return [...prev, newTodo]
            })
        } catch (error) {
            console.error('error on adding todo: ', error);
        }
    }


    return (
        <ThemedView style={styles.container}>
            <View style={styles.content}>
                <Pressable onPress={navigateToDone} style={styles.link}>
                    <ThemedText style={styles.linkText}>Check Completed Tasks?</ThemedText>
                </Pressable>
            </View>
            <View style={styles.inputContainer}>

                <ThemedInput autoCorrect={false} onChange={func} value={textState} placeholder="Add Task" style={styles.input} placeholderTextColor={'gray'} />

                <Pressable style={({ pressed }) => [
                    styles.addBtn,
                    {
                        opacity: pressed ? 0.7 : 1,
                        transform: [{ scale: pressed ? 0.97 : 1 }]
                    }]}
                    android_ripple={{ color: '#cccccc', radius: 20 }}
                    onPress={() => addTodo(textState)}>
                    <IconSymbol size={28} name="plus.app.fill" color={'white'} style={styles.symbol} />
                </Pressable>
            </View>

            <ScrollView
                style={styles.TodosListContainer}
                contentContainerStyle={styles.todosContent}
                showsVerticalScrollIndicator={false}
            >
                {
                    todos.length > 0 ? (todos.filter((t) => !t.isChecked).map((t) => <Todo todo={t} setTodos={setTodos} key={t._id} />)) : <ThemedText style={{ paddingTop: 10 }}>No Todos Found! 🥱</ThemedText>
                }

            </ScrollView>
        </ThemedView>
    );
}