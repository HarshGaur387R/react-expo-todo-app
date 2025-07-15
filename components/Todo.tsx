import styles from "@/app/(tabs)/(tasks)/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from 'react-native';
import Todos from '../app/(tabs)/(tasks)/todosType';
import { IconSymbol } from "./ui/IconSymbol";
import { ThemedInput } from '@/components/ThemedInput';

const Todo = memo(function Todo({ todo, setTodos }:
    {
        todo: Todos;
        setTodos: React.Dispatch<React.SetStateAction<Todos[]>>
    }) {
    const { content, isChecked } = todo;
    const [todoValue, setTodoValue] = useState<string>(content);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const autoSaveEdits = useCallback(async (_id: string, text: string) => {
        if (!_id) return;
        try {
            setTodos((prev) => {
                const updated = prev.map((todo) => todo._id === _id ? { ...todo, content: text } : todo);
                AsyncStorage.setItem('Todos', JSON.stringify(updated));
                return updated;
            })
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    }, [setTodos])

    const deleteTodo = useCallback(async (_id: string) => {
        try {
            setTodos((prev) => {
                const updated = prev.filter((todo) => todo._id !== _id);
                AsyncStorage.setItem('Todos', JSON.stringify(updated));
                return updated;
            });
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    }, [setTodos]); // or [todos] if using `todos` inside


    const handleOnValueChange = useCallback(async (value: boolean) => {
        try {
            setTodos((prev) => {
                const update = prev.map((val) => {
                    if (val._id === todo._id) {
                        return {
                            ...val, // clone the object
                            isChecked: value, // update only the checkbox state
                            checkedAt: value ? new Date() : undefined,
                        };
                    }
                    return val;
                })
                AsyncStorage.setItem('Todos', JSON.stringify(update));
                return update;
            })
        } catch (error) {
            console.error('Failed to check todo:', error);
        }
    }, [setTodos, todo._id])


    // Debounce & Auto-save when noteTitle or noteContent changes
    useEffect(() => {
        if (!todo) return;
        if (!todoValue) return;


        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
            autoSaveEdits(todo._id, todoValue);
        }, 500);

        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [todoValue])

    return (
        <View style={styles.todoContainer}>
            <Pressable style={styles.deleteBtn} onPress={() => { deleteTodo(todo._id) }}>
                <IconSymbol size={20} name="trash.fill" color={'white'} style={styles.symbol} />
            </Pressable>
            <View style={styles.checkBox}>
                <Checkbox value={isChecked} onValueChange={handleOnValueChange} />
            </View>
            <ThemedInput
                value={todoValue}
                onChange={(e) => {setTodoValue(e.nativeEvent.text); console.log(e.nativeEvent.text);
                 }}
                autoCorrect={false}
                placeholder="Enter your todo here."
                placeholderTextColor={"gray"}
                maxLength={300}
                multiline
                style= {customStyle.themedInput}
            />
        </View>
    )
})

const customStyle = StyleSheet.create({
    themedInput: {
        color: 'white',
        flexShrink: 1,
        flexWrap: 'wrap',
        fontSize: 16,
        padding: 2,
        width: '100%'
    }
})

export default Todo;