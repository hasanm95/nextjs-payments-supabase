import AddTodo from './add-todo'
import TodoList from './todo-list'

const Todo = () => {
  return (
    <div className='flex flex-col gap-4'>
        <AddTodo/>
        <TodoList/>
    </div>
  )
}

export default Todo