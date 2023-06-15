"use client";

import {useEffect, useId, useState} from "react";
import Link from "@components/elements/link";
import {useSearchParams} from "next/navigation";
import {Metadata} from "next";

interface Result extends Metadata {
  id: string;
  type: string;
  path: string;
  changed: string;
  title: string;
  description?: string;
}

const SearchResults = ({search}: { search: (search: string) => Promise<Result[]> }) => {
  const inputId = useId();
  const params = useSearchParams();
  const [results, setResults] = useState<Result[]>([])
  const [searchString, setSearchString] = useState<string>(params.get('q') ?? '')

  useEffect(() => {
    search(params.get('q') ?? '').then(nodes => setResults(nodes));
  }, [])

  const onClick = async () => {
    setResults(await search(searchString));
  }

  return (
    <div>
      <div className="mb-20 max-w-[500px]">
        <label htmlFor={inputId} className="block mb-5">Keyword Search</label>
        <input
          className="rounded-full h-20 w-full lg:w-100 text-20 mb-10"
          id={inputId}
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Enter') onClick()
          }}
        />
        <button
          type="submit"
          onClick={onClick}
          className="bg-cardinal-red text-white hocus:bg-black hocus:text-white px-10 py-5 no-underline hocus:underline transition"
        >
          Search
        </button>
      </div>

      {results &&
        <ul className="list-unstyled" aria-live="polite">
          {results.map(result =>
            <li key={result.id}
                className="border-b border-black-20 last:border-0 py-20">
              <Link href={result.path} className="text-m2 font-bold">
                {result.title}
              </Link>
              <p>
                {result.description}
              </p>
              <div>Last
                Updated: {new Date(result.changed).toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'})}</div>
            </li>
          )}
        </ul>

      }
    </div>
  )
}
export default SearchResults