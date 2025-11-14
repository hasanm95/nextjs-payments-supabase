import AddTodo from './add-todo'
import TodoList from './todo-list'

export default function Todo() {
  return (
    <section className="w-full max-w-2xl mx-auto rounded-md border bg-card p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Todos</h2>
      </div>
      <AddTodo/>
      <TodoList/>
    </section>
  )
}