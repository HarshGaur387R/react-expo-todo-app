import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    content: {
        // flex: 1, // <-- Add this line
        backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 10
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
    NotesListContainer: {
        flex: 1,
    },
    notesContent: {
        paddingTop: 20,
        paddingHorizontal: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingBottom: 100,
        gap: 15,
    },

    mainContainer: {
        width: '45%',
        minHeight: 215,
        maxHeight: 215,
    },
    noteContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'violet',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 4
    },
    noteContent: {
        color: 'white',
        flexShrink: 1,
        flexWrap: 'wrap',
        fontSize: 16,
    },
    noteTitle: {
        width: '100%',
        fontSize: 18,
        fontWeight: '600',
        backgroundColor: '#D86DD8',
        paddingHorizontal: 4,
        paddingVertical: 2
    },
    noteText: {
        padding: 4,
    },
    titleAndContent: {
        flex: 1,
    },
    noteFooter: {
        flexDirection: 'row',
        fontFamily: 'mono',
        width: '100%',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    noteFooterDate: {
        fontSize: 12,
        backgroundColor: '#D86DD8',
        paddingHorizontal: 4,
    },
    deleteBtn: {
        zIndex: 1000,
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 3
    },
    addNoteBtn: {
        flexDirection: 'row',
        backgroundColor: 'violet',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    inputsContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        gap: 20
    },
    input: {
        backgroundColor: '#333',
        color: 'white',
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    containerForButtons: {
        flex: 1,
        flexDirection: 'row-reverse',
        gap: 10
    },
    button: {
        backgroundColor: 'violet',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center'
    },

});

export default styles