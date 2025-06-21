import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import Note from "@/components/Note";
import styles from "./styles";

interface NoteType {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
}

export default function Page() {
    const navigateToAddNote = () => {
        router.replace("/notes/addNoteScreen");
    };

    const [notes, setNotes] = useState<NoteType[]>([
        {
            _id: '1',
            title: 'My note 1',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, vel natus sit unde fuga tenetur consequuntur ducimus inventore eveniet enim rerum et quod nulla incidunt praesentium dolor impedit, corrupti similique esse quia ipsum recusandae expedita! Perspiciatis exercitationem quos perferendis expedita natus voluptatum laudantium voluptas, cupiditate, blanditiis harum animi illo, ipsum quasi illum.',
            createdAt: new Date()
        },
        {
            _id: '2',
            title: 'My note 2 but a bigger note',
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis ex tempora officia exercitationem quibusdam debitis architecto voluptatum corrupti voluptates sunt.',
            createdAt: new Date()
        },
        {
            _id: '3',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '4',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '5',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '6',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '7',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '8',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '9',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '10',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '11',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '12',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '13',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
         {
            _id: '14',
            title: 'My note 3',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, officia.',
            createdAt: new Date()
        },
    ])

    return (
        <ThemedView style={styles.container}>
            <View style={styles.content}>
                <Pressable onPress={navigateToAddNote} style={styles.addNoteBtn}>
                    <ThemedText style={styles.linkText}>Add Note</ThemedText>
                </Pressable>
            </View>

            <ScrollView
                style={styles.NotesListContainer}
                contentContainerStyle={styles.notesContent}
                showsVerticalScrollIndicator={false}
            >
                {
                    notes.map((n) => <Note note={n} setNotes={setNotes} key={n._id} />)
                }

            </ScrollView>
        </ThemedView>
    );
}