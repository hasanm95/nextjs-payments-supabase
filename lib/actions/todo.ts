
import { createClient } from "@/lib/supabase/client";

interface NewTodo {
    email: string;
    title: string; 
    is_completed: boolean;
}

export async function createTodo(newTodo: NewTodo) {
	const supabase = createClient();
    const { data, error } = await supabase
    .from('todos')
    .insert(newTodo)
    .select('*');

    if (error) {
        throw new Error(error.message);
    }
    return data;
}