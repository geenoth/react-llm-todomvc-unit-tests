
import classnames from "classnames";

export function FilterLink_Active({ isActive = false, onFilterChange }) {
    const handleClick = (e) => {
        e.preventDefault();
        onFilterChange("active");
    };

    return (
        <li>
            <a
                className={classnames({ selected: isActive })}
                href="#/active"
                data-testid="filter-link-active"
                onClick={handleClick}
            >
                Active
            </a>
        </li>
    );
}
