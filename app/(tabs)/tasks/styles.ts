import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    content: {
        // flex: 1, // <-- Add this line
        flexDirection: 'column',
        justifyContent: 'flex-start',
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

export default styles