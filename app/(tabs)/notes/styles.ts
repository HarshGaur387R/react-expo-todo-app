import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    noteContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: 'violet',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
    },
    noteHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: '#D86DD8',
    },
    noteBody: {
        flex: 1,
        padding: 8,
    },
    noteContent: {
        color: 'white',
        flexShrink: 1,
        flexWrap: 'wrap',
        fontSize: 16,
    },
    noteTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        marginRight: 8,
    },
    noteText: {
        color: 'white',
        fontSize: 14,
        lineHeight: 20,
    },
    titleAndContent: {
        flex: 1,
    },
    noteFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
    },
    noteFooterDate: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'mono',
    },
    viewFullLink: {
        color: 'white',
        fontSize: 12,
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
    deleteBtn: {
        width: 28,
        height: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
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
        height: 40,
        backgroundColor: 'violet',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center'
    },

    notePage: {
        padding: 10,
    },

    notePageContent: {
        padding: 10,
        backgroundColor: '#202020',
        borderLeftWidth: 4,
        borderLeftColor: 'violet'
    },

    notePageFooterDate: {
        fontFamily: 'mono',
        fontSize: 12,
        paddingTop: 20,
        color: 'gray'
    },

    notePageFooterTime: {
        fontFamily: 'mono',
        fontSize: 12,
        paddingTop: 0,
        color: 'gray'
    }
});

export default styles;