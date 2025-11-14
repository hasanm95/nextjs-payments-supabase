
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

export async function deleteTodo(id: number) {
    const supabase = createClient();
    const {data, error} = await supabase.from('todos').delete().eq("id", id).select();

    if (error) {
        throw new Error(error.message);
    }
}

export async function markCompltedTodo(id: number) {
    const supabase = createClient();
    const {data, error} = await supabase.from('todos').update({is_completed: true}).eq("id", id).select();

    if (error) {
        throw new Error(error.message);
    }
}

export async function updateTodo({id, title}:{id: number, title: string}) {
    const supabase = createClient();
    const {data, error} = await supabase.from('todos').update({title}).eq("id", id).select();

    if (error) {
        throw new Error(error.message);
    }

    return data
}