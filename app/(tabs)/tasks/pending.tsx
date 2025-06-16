import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Checkbox } from 'expo-checkbox';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, TextInput, TextInputChangeEventData, View } from "react-native";

interface Todos {
    content: string;
    isChecked: boolean;
    createdAt: Date;
    checkedAt?: Date;
    _id: string;
}

function Todo({ todo, setTodos }:
    {
        todo: Todos;
        setTodos: React.Dispatch<React.SetStateAction<Todos[]>>
    }) {
    const { content, isChecked } = todo;

    // TODO: Write logic to delete Todo from localStorage
    const deleteTodo = (_id: string) => {
        setTodos((prev) => {
            return prev.filter((value) => value._id !== _id)
        })
    }

    const handleOnValueChange = (value: boolean) => {
        setTodos((prev) => {
            return prev.map((val) => {
                if (val._id === todo._id) {
                    val.isChecked = value;
                }
                return val;
            })
        })
    }

    return (
        <View style={styles.todoContainer}>
            <Pressable style={styles.deleteBtn} onPress={()=>{deleteTodo(todo._id)}}>
                <IconSymbol size={20} name="trash.fill" color={'white'} style={styles.symbol} />
            </Pressable>
            <View style={styles.checkBox}>
                <Checkbox value={isChecked} onValueChange={handleOnValueChange} />
            </View>
            <ThemedText style={styles.todoContent}>{content}</ThemedText>
        </View>
    )
}


export default function PendingScreen() {
    const router = useRouter();
    const [textState, setText] = useState<string>('');
    //TODO: Write logic to fetch todos from localstorage.
    const [todos, setTodos] = useState<Todos[]>([
        {
            content: 'Complete maths chapter 1',
            isChecked: false,
            createdAt: new Date(),
            _id: '1'
        },
        {
            content: 'Learn physics',
            isChecked: false,
            createdAt: new Date(),
            _id: '2'
        },
        {
            content: 'Learn react-native expo',
            isChecked: false,
            createdAt: new Date(),
            _id: '3'
        },
    ])


    const func = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setText(e.nativeEvent.text);
    }

    const navigateToDone = () => {
        router.replace("/tasks/done");
    };

    const addTodo = (content: string) => {

        //TODO: Write logic to add todo in localstorage.

        const newTodo: Todos = {
            content: content,
            isChecked: false, // By default 'isChecked' Value is false.
            createdAt: new Date(),
            _id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        }

        setTodos((prev) => {
            return [...prev, newTodo]
        })
    }


    return (
        <ThemedView style={styles.container}>
            <View style={styles.content}>
                <Pressable onPress={navigateToDone} style={styles.link}>
                    <ThemedText style={styles.linkText}>Check Completed Tasks?</ThemedText>
                </Pressable>
            </View>
            <View style={styles.inputContainer}>
                <TextInput autoCorrect={false} onChange={func} value={textState} placeholder="Add Task" style={styles.input} />
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
                    todos.map((t) => <Todo todo={t} setTodos={setTodos} key={t._id} />)
                }

            </ScrollView>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    link: {
        backgroundColor: 'violet',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    linkText: {
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#333',
        color: 'white',
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    addBtn: {
        width: 50,
        height: 50,
        backgroundColor: 'violet',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 1,
    },
    symbol: {
        textAlign: 'center',
    },
    TodosListContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    todosContent: {
        paddingBottom: 100,
        gap: 12,
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'violet',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 12,
        gap: 10,
    },
    checkBox: {
        marginTop: 3,
        alignSelf: 'baseline'
    },
    todoContent: {
        color: 'white',
        flexShrink: 1,
        flexWrap: 'wrap',
        fontSize: 16,
    },
    deleteBtn: {
        color: 'red',
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 3
    }
});
