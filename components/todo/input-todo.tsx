"use client"

import useUser from "@/app/hook/useUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createTodo } from "@/lib/actions/todo"
import { useMutation } from "@tanstack/react-query"
import { ReactElement, useRef } from "react"

function AddTodo() {
    const { data } = useUser();
    const formRef = useRef<HTMLFormElement>(null); 
    // const queryClient = useQueryClient()

    const { mutate, isPending, isError, error} = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            // queryClient.invalidateQueries(["todos"])
            formRef.current?.reset()
        },
        onError: (err) => {
          console.error('Error creating task:', err.message);
        },
    })

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title')
        if(!data?.email|| !title) return;
        const newTodoData = {
          title: title as string,
          email: data.email,
          is_completed: false,
        };
        mutate(newTodoData); 
    }

    return (
        <form ref={formRef} className="flex flex-col w-full max-w-sm items-center gap-2" onSubmit={submitHandler}>
            <div className="flex gap-2.5">
                <Input type="text" name="title" placeholder="Add todo" disabled={isPending} />
                <Button type="submit" variant="outline" disabled={isPending}>
                    Submit
                </Button>
            </div>
            {isError && <p className="text-red-700">{error.message}</p>}
        </form>
    )
}
export default AddTodo