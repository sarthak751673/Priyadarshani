import React, { useMemo, useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LOCATIONS, AREAS } from '../data/mockData'
import LocationCard from '../components/LocationCard'

export default function Search() {
  const { navigate } = useApp()
  const [query, setQuery] = useState('')
  const [area, setArea] = useState('All')

  const results = useMemo(() => {
    return LOCATIONS.filter((l) => {
      const matchesArea = area === 'All' || l.area === area
      const matchesQuery = !query.trim() || `${l.name} ${l.area}`.toLowerCase().includes(query.toLowerCase())
      return matchesArea && matchesQuery
    })
  }, [query, area])

  return (
    <div className="pb-24">
      <div className="safe-top px-5 pt-5">
        <h1 className="font-display text-xl font-semibold text-ink mb-3">Find parking</h1>
        <div className="flex items-center gap-3 bg-surface border border-surface-line rounded-xl2 px-4 py-3">
          <SearchIcon size={18} className="text-ink-faint shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “Viman Nagar” or “Kharadi”"
            className="bg-transparent flex-1 text-[14px] text-ink placeholder:text-ink-faint focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-3.5 pl-5 flex gap-2 overflow-x-auto no-scrollbar pr-5">
        {['All', ...AREAS].map((a) => (
          <button
            key={a}
            onClick={() => setArea(a)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] border ${
              area === a ? 'bg-brand border-brand text-white font-medium' : 'bg-surface border-surface-line text-ink-soft'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="px-5 mt-4">
        <p className="text-[12.5px] text-ink-faint mb-3">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </p>
        <div className="space-y-3">
          {results.map((loc) => (
            <LocationCard key={loc.id} loc={loc} onClick={() => navigate({ name: 'details', locationId: loc.id })} />
          ))}
          {results.length === 0 && (
            <div className="text-center py-16">
              <p className="text-ink-soft text-[14px]">No parking areas match that search.</p>
              <p className="text-ink-faint text-[12.5px] mt-1">Try a different area or clear the filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
