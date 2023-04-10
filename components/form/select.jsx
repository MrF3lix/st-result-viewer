export const Select = ({ label, options, selected, disabled, onChange, hideLabel = false }) => (
    <label className="text-left">
        {hideLabel || !label &&
            <span className="text-gray-600 text-xs">{label}</span>
        }
        <select
            onChange={onChange}
            value={selected}
            disabled={disabled}
            className="
        p-2 border rounded-sm w-full \
        bg-gray-50 border-gray-200 \
        text-gray-900 text-sm \
        disabled:text-gray-400 disabled:bg-gray-200 disabled:border-gray-200"
        >
            <option disabled value={-1}>Select {label}</option>
            {options.map((option, i) => (
                <option
                    key={i}
                    value={option.value}
                >
                    {option.name}
                </option>
            ))}
        </select>
    </label>
)