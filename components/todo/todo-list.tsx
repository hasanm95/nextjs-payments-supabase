import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import TodoItem from "./todo-item";


const TodoList = () => {
    const {data} = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const supabase = createClient()
			const { data } = await supabase.auth.getSession();
            if (data.session?.user?.email) {
				const { data: todos } = await supabase
					.from("todos")
					.select("*")
					.eq("email", data.session.user.email)

				return todos;
			}
        }
    })

    return (
            <ul className="space-y-4 flex flex-col gap-4">
                {data?.map(item=> <TodoItem key={item.id} id={item.id} title={item.title} email={item.email} is_completed={item?.is_completed}/>)}
            </ul>
    )
}

export default TodoList