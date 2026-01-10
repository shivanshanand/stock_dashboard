function CompanySidebar({ companies, selected, onSelect }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-3">Companies</h3>

      <ul className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
        {companies.map((c) => (
          <li
            key={c}
            onClick={() => onSelect(c)}
            className={`cursor-pointer px-3 py-2 rounded text-sm font-medium transition ${
              selected === c
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanySidebar;
