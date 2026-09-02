function Selector({ label, value, options, onSelect }) {
  return <div>
    <div className="mb-2.5 flex items-center justify-between"><p className="text-sm font-bold text-ink">{label}</p><span className="text-sm text-ink-soft">{value}</span></div>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => <button key={option} type="button" onClick={() => onSelect(option)} aria-pressed={option === value}
        className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${option === value ? "border-ink bg-ink text-white shadow-sm" : "border-line bg-surface text-ink-soft hover:border-ink hover:text-ink"}`}>{option}</button>)}
    </div>
  </div>;
}
export function ColorSelector({ colors, selectedColor, onSelect }) { return <Selector label="Colour" value={selectedColor} options={colors} onSelect={onSelect} />; }
export function StorageSelector({ storageOptions, selectedStorage, onSelect }) { return <Selector label="Storage" value={selectedStorage} options={storageOptions} onSelect={onSelect} />; }
