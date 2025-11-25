
import classnames from "classnames";

export function FilterLink_All({ isActive = false, onFilterChange }) {
    const handleClick = (e) => {
        e.preventDefault();
        onFilterChange("all");
    };

    return (
        <li>
            <a
                className={classnames({ selected: isActive })}
                href="#/"
                data-testid="filter-link-all"
                onClick={handleClick}
            >
                All
            </a>
        </li>
    );
}
