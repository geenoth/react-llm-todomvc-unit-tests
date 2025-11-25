export function RemainingCounter({ count = 0 }) {
    const itemText = count === 1 ? "item" : "items";

    return (
        <span className="todo-count" data-testid="remaining-counter">
            {`${count} ${itemText} left!`}
        </span>
    );
}
