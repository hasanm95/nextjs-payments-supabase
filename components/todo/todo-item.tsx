import { deleteTodo, markCompltedTodo, updateTodo } from "@/lib/actions/todo";
import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import  { useState, useRef, useEffect } from "react";

export interface TodoItemProps {
  id: number;
  title: string;
  email: string;
  is_completed?: boolean | null;
}

export default function TodoItem({
  id,
  title,
  email,
  is_completed = false,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDraft(title);
  }, [title]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  function handleCancel() {
    setDraft(title);
    setIsEditing(false);
  }


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
        const supabase = createClient()
        const { data } = await supabase.auth.getSession();
        if (data) {
            deleteTodoMutate()
        }
    }

    const { mutate: markdCompletedTodoMutate} = useMutation({
        mutationFn: () =>  markCompltedTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        },
        onError: (err) => {
            console.error('Error creating task:', err.message);
        },
    })

    const markCompleted = async () => {
        const supabase = createClient()
        const { data } = await supabase.auth.getSession();
        if (data) {
            markdCompletedTodoMutate()
        }
    }

    const { mutate: updateTodoMutate} = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        },
        onError: (err) => {
            console.error('Error creating task:', err.message);
        },
    })

    const handleSave = async () => {
        const trimmed = draft.trim();
        if (!trimmed || trimmed === title) return; 

        const supabase = createClient()
        const { data } = await supabase.auth.getSession();
        if (data) {
            updateTodoMutate({id, title: trimmed})
        }
        setIsEditing(false);
    }

  return (
    <li
      className="flex items-center justify-between gap-4 p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white"
      role="listitem"
    >
      <div className="flex items-start gap-3 min-w-0">
        {/* Toggle */}
        <button
          aria-pressed={!!is_completed}
          aria-label={is_completed ? "Mark as not completed" : "Mark as completed"}
          disabled={!!is_completed}
          onClick={markCompleted}
          className={`flex-none w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-1"
            ${is_completed ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"}`}
        >
          {/* visual check */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5"
            aria-hidden
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d={!!is_completed ? "M5 13l4 4L19 7" : "M5 12h14"}
            />
          </svg>
        </button>

        {/* Content */}
        <div className="flex flex-col min-w-0">
          {isEditing ? (
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
                className="min-w-0 w-full p-2 rounded-md border border-black text-black focus:outline-none focus:ring-2 focus:ring-offset-1"
                aria-label="Edit todo title"
              />
              <button
                onClick={handleSave}
                className="px-3 py-1 rounded-lg text-sm text-black font-medium border hover:bg-gray-50"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <h3
                  className={`truncate text-sm font-semibold leading-tight min-w-0"
                    ${is_completed ? "line-through text-gray-400" : "text-gray-900"}`}
                >
                  {title}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full self-start border text-gray-500 bg-gray-50"
                    ${is_completed ? "opacity-60" : ""}`}
                >
                  {is_completed ? "Done" : "Pending"}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsEditing((s) => !s)}
          aria-label={isEditing ? "Close editor" : "Edit todo"}
          className="px-3 py-1 rounded-lg border text-sm text-black hover:bg-gray-50"
        >
          {isEditing ? "Close" : "Edit"}
        </button>

        <button
          onClick={deleteTodoHandler}
          aria-label="Delete todo"
          className="px-3 py-1 rounded-lg border text-sm text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
