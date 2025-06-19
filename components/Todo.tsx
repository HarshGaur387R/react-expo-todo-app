import styles from "@/app/(tabs)/tasks/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { memo, useCallback } from "react";
import { Pressable, View } from 'react-native';
import Todos from '../app/(tabs)/tasks/todosType';
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";

const Todo = memo(function Todo({ todo, setTodos }:
    {
        todo: Todos;
        setTodos: React.Dispatch<React.SetStateAction<Todos[]>>
    }) {
    const { content, isChecked } = todo;

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

    return (
        <View style={styles.todoContainer}>
            <Pressable style={styles.deleteBtn} onPress={() => { deleteTodo(todo._id) }}>
                <IconSymbol size={20} name="trash.fill" color={'white'} style={styles.symbol} />
            </Pressable>
            <View style={styles.checkBox}>
                <Checkbox value={isChecked} onValueChange={handleOnValueChange} />
            </View>
            <ThemedText style={styles.todoContent}>{content}</ThemedText>
        </View>
    )
})

export default Todo;