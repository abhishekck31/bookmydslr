import { useState } from "react"

const suggestionsList = [
  "Canon EOS R5",
  "Nikon Z6",
  "Sony A7 IV",
  "Fujifilm X-T5",
  "Panasonic Lumix S5",
  // ...add more as needed
]

export default function Header() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (value.length > 0) {
      setSuggestions(
        suggestionsList.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      )
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSelect = (suggestion: string) => {
    setQuery(suggestion)
    setSuggestions([])
    setShowSuggestions(false)
    // Optionally trigger search here
  }

  return (
    <header className="w-full px-4 py-3 flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-black">
      <button className="btn btn-featured">Featured</button>
      <div className="relative w-full max-w-xs sm:ml-4">
        <input
          type="text"
          className="w-full rounded border px-3 py-2"
          placeholder="Search cameras..."
          value={query}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(query.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 rounded bg-white dark:bg-gray-800 shadow z-10">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="cursor-pointer px-3 py-2 hover:bg-amber-100 dark:hover:bg-amber-900"
                onMouseDown={() => handleSelect(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}