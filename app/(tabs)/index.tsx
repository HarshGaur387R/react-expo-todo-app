import { router } from "expo-router";
import { useEffect } from "react";

export default function IndexRedirect() {
    useEffect(() => {
        router.replace("/tasks");
    }, []);

    return null;
}