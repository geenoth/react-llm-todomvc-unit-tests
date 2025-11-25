import { useCallback } from "react";

export function ToggleAllCheckbox({ allCompleted = false, onToggleAll, disabled = true }) {
    const handleChange = useCallback(
        (e) => {
            onToggleAll(e.target.checked);
        },
        [onToggleAll]
    );

    return (
        <div className="toggle-all-container">
            <input
                className="toggle-all"
                type="checkbox"
                id="toggle-all-checkbox"
                data-testid="toggle-all-checkbox"
                checked={allCompleted}
                onChange={handleChange}
                disabled={disabled}
                aria-label="Toggle all todos"
            />
            <label className="toggle-all-label" htmlFor="toggle-all-checkbox">
                Toggle All Input
            </label>
        </div>
    );
}
