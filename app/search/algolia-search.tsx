"use client";

import algoliasearch from 'algoliasearch/lite';
import {Hits, useInstantSearch, useSearchBox} from "react-instantsearch";
import {InstantSearchNext} from 'react-instantsearch-nextjs';
import Link from "@components/elements/link";
import {H2} from "@components/elements/headers";
import Image from "next/image";
import {useEffect, useId, useRef, useState} from "react";
import Button from "@components/elements/button";
import type {InstantSearch} from "instantsearch.js";
import {UseSearchBoxProps} from "react-instantsearch";
import {useRouter, useSearchParams} from "next/navigation";

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
}

const AlgoliaSearch = ({appId, searchIndex, searchApiKey}: Props) => {
  const searchClient = algoliasearch(appId, searchApiKey);
  const searchParams = useSearchParams();

  return (
    <div>
      <InstantSearchNext
        indexName={searchIndex}
        searchClient={searchClient}
        initialUiState={{
          [searchIndex]: {query: searchParams.get('q') || ''},
        }}
        future={{preserveSharedStateOnUnmount: true}}
      >
        <SearchBox/>

        <Hits
          hitComponent={Hit}
          classNames={{list: "list-unstyled my-20", item: "border-b last:border-0"}}
        />
      </InstantSearchNext>
    </div>
  )
}

type AlgoliaHit = {
  url: string
  title: string
  summary?: string
  photo?: string
  updated?: number
}

const Hit = ({hit}: { hit: AlgoliaHit }) => {
  const hitUrl = new URL(hit.url);

  return (
    <article className="@container flex justify-between gap-20 py-12">
      <div>
        <H2>
          <Link href={hit.url.replace(hitUrl.origin, '')}>
            {hit.title}
          </Link>
        </H2>
        <p>{hit.summary}</p>

        {hit.updated &&
          <div className="text-2xl">
            Last Updated: {new Date(hit.updated * 1000).toLocaleDateString('en-us', {
            month: "long",
            day: "numeric",
            year: "numeric"
          })}
          </div>
        }
      </div>

      {hit.photo &&
        <div className="hidden @6xl:block relative shrink-0 aspect-1 h-[150px] w-[150px]">
          <Image
            className="object-cover"
            src={hit.photo.replace(hitUrl.origin, `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}`)}
            alt=""
            fill
          />
        </div>
      }
    </article>
  )
}


const SearchBox = (props?: UseSearchBoxProps) => {
  const router = useRouter();
  const {query, refine} = useSearchBox(props);
  const {status} = useInstantSearch();
  const [inputValue, setInputValue] = useState<string>(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const isSearchStalled = status === 'stalled';

  useEffect(() => {
    if (query) router.replace(`?q=${query}`, {scroll: false})
  }, [router, query])

  return (
    <form
      className="flex flex-col gap-10"
      action=""
      role="search"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (inputRef.current) {
          inputRef.current.blur();
        }
        refine(inputValue);
      }}
      onReset={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setInputValue('');
        refine('');

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <div className="flex flex-col">
        <label className="font-bold" htmlFor={inputId}>
          Keywords<span className="sr-only">&nbsp;Search</span>
        </label>
        <input
          id={inputId}
          className="rounded-full hocus:shadow-2xl max-w-xl h-20 text-m1"
          ref={inputRef}
          autoComplete="on"
          autoCorrect="on"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={512}
          type="search"
          required
          value={inputValue}
          onChange={e => setInputValue(e.currentTarget.value)}
          autoFocus
        />
      </div>
      <div className="flex gap-10">
        <Button type="submit">
          Submit
        </Button>
        <Button
          secondary
          type="reset"
          className={inputValue.length === 0 || isSearchStalled ? 'hidden' : undefined}
        >
          Reset
        </Button>
      </div>
      <StatusMessage status={status} query={query}/>
    </form>
  );
}

const StatusMessage = ({status, query}: { status: InstantSearch['status'], query: string }) => {
  let message = status === 'loading' ? 'Loading' : null;
  if (status != 'loading' && query) {
    message = `Showing results for "${query}"`
  }
  return (
    <div className="sr-only" aria-live="polite">{message}</div>
  )
}

export default AlgoliaSearch;