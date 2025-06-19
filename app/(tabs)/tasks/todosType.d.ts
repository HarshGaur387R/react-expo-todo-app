interface todosType {
    content: string;
    isChecked: boolean;
    createdAt: Date;
    checkedAt?: Date;
    _id: string;
}

export default todosType