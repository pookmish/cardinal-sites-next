"use client";

import StanfordNewsListItem from "@components/nodes/list-item/stanford-news/stanford-news-list-item";
import {useLayoutEffect, useRef, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import SelectList from "@components/elements/select-list";
import Button from "@components/elements/button";
import {NewsNodeType} from "@lib/types";
import {DrupalTaxonomyTerm} from "next-drupal";

const NewsFilteringListView = ({items, topics}: { items: NewsNodeType[], topics: DrupalTaxonomyTerm[] }) => {
  const focusRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayedItems, setDisplayedItems] = useState<NewsNodeType[]>(items);
  const [page, setPage] = useState<number>(1);
  const [animationParent] = useAutoAnimate();

  const filterItems = () => {
    setPage(1);
    if (inputRef.current?.value === 'All') return setDisplayedItems(items);

    const filteredItems = items.filter(item => {
      return !!item.su_news_topics?.find(topic => topic.id === inputRef.current?.value)
    })

    setDisplayedItems(filteredItems);
  }

  useLayoutEffect(() => focusRef.current?.focus(), [page])

  const current = displayedItems.slice(0, page * 10).length;
  const total = items.length;

  return (
    <div>
      <form className="flex gap-20">
        <SelectList inputRef={inputRef} label="Topic">
          <option>All</option>
          <SelectOptions terms={topics}/>
        </SelectList>
        <Button buttonElem onClick={filterItems}>
          Submit
        </Button>
      </form>

      <span className="sr-only" aria-live="polite">Showing {current} of {total}</span>
      <ul className="list-unstyled mb-20" ref={animationParent}>
        {displayedItems.slice(0, page * 10).map(item =>
          <li
            key={item.id}
            tabIndex={(page > 1 && item.id === displayedItems[((page - 1) * 10)]?.id) ? 0 : -1}
            className="border-b border-black-20 last:border-0 pb-10 last:pb-0 pt-10 first:pt-0"
            ref={(page > 1 && item.id === displayedItems[((page - 1) * 10)]?.id) ? focusRef : null}
          >
            <StanfordNewsListItem node={item}/>
          </li>
        )}

        {(displayedItems.length > page * 10) &&
          <Button
            buttonElem
            centered
            onClick={() => setPage(page + 1)}
          >
            View More
          </Button>
        }
      </ul>
    </div>
  )
}

const SelectOptions = ({terms, level = 0}: { terms: DrupalTaxonomyTerm[], level?: number }) => {
  return (
    <>
      {terms.map(term =>
        <>
          <option value={term.id}>{`-`.repeat(level)} {term.name}</option>
          {term.below && <SelectOptions terms={term.below} level={level + 1}/>}
        </>
      )}

    </>
  )
}


export default NewsFilteringListView;