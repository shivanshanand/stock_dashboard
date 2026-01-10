function TimeRangeSelector({ value, onChange }) {
  return (
    <div className="flex gap-2 mb-4">
      {[30, 90, 180].map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={`px-3 py-1 rounded text-sm border ${
            value === d
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          {d}D
        </button>
      ))}
    </div>
  );
}

export default TimeRangeSelector;
