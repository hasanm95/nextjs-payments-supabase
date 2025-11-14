import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa';
import {deleteTodo} from "@/lib/actions/todo"
import { createClient } from "@/lib/supabase/client";

interface TodoItemProps {
    id: number;
    title: string
    email: string
    is_completed: boolean | null
}

function TodoItem({ title, email, is_completed, id }: TodoItemProps) {
    const queryClient = useQueryClient()
    const { mutate: deleteTodoMutate, isPending} = useMutation({
        mutationFn: () =>  deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        },
        onError: (err) => {
            console.error('Error creating task:', err.message);
        },
    })

    const deleteTodoHandler = async () => {
        console.log("detel")
        const supabase = createClient()
        const { data } = await supabase.auth.getSession();
        if (data) {
            deleteTodoMutate()
        }
    }

  return (
    <li
      className={`flex items-baseline justify-between p-4 rounded-lg transition-colors duration-300 ${
        is_completed
          ? 'bg-gray-200 dark:bg-gray-700'
          : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
      }`}
    >
      <div className="flex flex-col gap-4">
        {/* <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 dark:bg-gray-600"
        /> */}
        <span
          className={`text-lg transition-colors duration-300 block ${
            is_completed
              ? 'line-through text-gray-500 dark:text-gray-400'
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {title} 
        </span>
        <span className='block'>
            Owner: {email}
        </span>
      </div>
      <button
        onClick={deleteTodoHandler}
        className="text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer"
        aria-label="Delete task"
        disabled={isPending}
      >
        <FaTrash />
      </button>
    </li>
  );
}

export default TodoItem;
