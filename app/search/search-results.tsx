"use client";

import {FormEvent, useEffect, useRef, useState} from "react";
import Link from "@components/elements/link";
import {useSearchParams} from "next/navigation";
import {ArrowPathIcon} from "@heroicons/react/20/solid";

export type SearchResult = {
  id: string
  title: string
  path: string
  changed: string
}

const SearchResults = ({search}: { search: (_search: string) => Promise<SearchResult[]> }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const params = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([])
  const [searchString, setSearchString] = useState<string>(params?.get('q') || '')
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    search(params?.get('q') || '').then(nodes => setResults(nodes));
  }, [params, search])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    const searchString = inputRef.current?.value || '';
    search(searchString).then(results => {
      setResults(results);
      setSearchString(searchString);
      setIsLoading(false)
    });
  }

  return (
    <div>
      <form className="mb-20 max-w-[500px]" onSubmit={onSubmit}>
        <label htmlFor="query" className="block mb-5">Keyword Search</label>
        <input
          ref={inputRef}
          className="rounded-full h-20 w-full lg:w-100 text-20 mb-10"
          id="query"
          type="text"
          required
          defaultValue={searchString}
        />
        <button
          type="submit"
          className={(isLoading ? "bg-black" : "bg-cardinal-red") + " text-white hocus:bg-black hocus:text-white px-10 py-5 no-underline hocus:underline transition cursor-pointer"}
          disabled={isLoading}
        >
          Search
        </button>
      </form>

      <div className="sr-only" aria-live="polite">
        Showing {results.length} {!searchString ? 'suggestions.' : `results for ${searchString}.`}
      </div>
      {isLoading &&
        <div className="fixed top-0 left-0 bg-black w-screen h-screen opacity-30">
          <ArrowPathIcon width={50} className="animate-spin fixed top-1/2 left-1/2 text-white"/>
        </div>
      }
      {results.length === 0 && <div>No results found for your search. Please try another keyword.</div>}

      {results.length > 0 &&
        <ul className="list-unstyled">
          {results.map(result =>
            <li key={result.id}
                className="border-b border-black-20 last:border-0 py-20">
              <Link href={result.path} className="text-m2 font-bold">
                {result.title}
              </Link>
              <div>Last
                Updated: {new Date(result.changed).toLocaleDateString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</div>
            </li>
          )}
        </ul>
      }
    </div>
  )
}
export default SearchResults