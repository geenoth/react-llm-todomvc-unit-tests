import classnames from "classnames";

export function TodoList({ todos = [], renderItem }) {
    return (
        <ul className={classnames("todo-list")} data-testid="todo-list">
            {todos.map((todo, index) => (
                <li
                    key={todo.id}
                    className={classnames({ completed: todo.completed })}
                    data-testid={`todo-item-${todo.id}`}
                >
                    {renderItem(todo, index)}
                </li>
            ))}
        </ul>
    );
}
