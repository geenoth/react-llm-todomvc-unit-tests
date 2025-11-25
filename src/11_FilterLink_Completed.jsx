
import classnames from "classnames";

export function FilterLink_Completed({ isActive = false, onFilterChange }) {
    const handleClick = (e) => {
        e.preventDefault();
        onFilterChange("completed");
    };

    return (
        <li>
            <a
                className={classnames({ selected: isActive })}
                href="#/completed"
                data-testid="filter-link-completed"
                onClick={handleClick}
            >
                Completed
            </a>
        </li>
    );
}
