import Link from "@components/elements/link";
import parse, {HTMLReactParserOptions, Element, domToReact, attributesToProps, DOMNode} from "html-react-parser"
import Image from "next/image";
import Oembed from "@components/elements/ombed";
import React, {ComponentProps, PropsWithoutRef} from "react";
import {H2, H3, H4, H5, H6} from "@components/elements/headers";
import {twMerge} from "tailwind-merge";
import Script from "next/script";

interface Props {
  html: string
  className?: string
}

const Wysiwyg = ({html, className = "", ...props}: PropsWithoutRef<Props>) => {
  className = twMerge(className, 'wysiwyg');
  const addMathJax = html.match(/\$\$.*\$\$/) || html.match(/\\\[.*\\\]/) || html.match(/\\\(.*\\\)/);
  return (
    <div className={className} {...props}>
      {addMathJax &&
        <Script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" strategy="lazyOnload"/>
      }
      {formatHtml(html)}
    </div>
  )
}

const options: HTMLReactParserOptions = {
  replace: (domNode) => {

    if (domNode instanceof Element) {
      const nodeProps = attributesToProps(domNode.attribs);
      nodeProps.className = fixClasses(nodeProps.className) ?? '';
      let NodeName: React.ElementType = domNode.name as React.ElementType
      const children: DOMNode[] = domNode.children as DOMNode[];

      switch (domNode.name) {
        case "a":
          return (
            <Link href={nodeProps.href as string} prefetch={false} {...nodeProps}>
              {domToReact(children, options)}
            </Link>
          )

        case "div":
          delete nodeProps.role;
          if (nodeProps.className?.indexOf('media-entity-wrapper') >= 0) {
            return cleanMediaMarkup(domNode);
          }
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        case 'figure':
          return cleanMediaMarkup(domNode);

        case 'p':
          nodeProps.className += twMerge(nodeProps.className, 'max-w-[100ch]');
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        case 'script':
          return <></>;

        case "h2":
          return <H2 {...nodeProps}>{domToReact(children, options)}</H2>
        case "h3":
          return <H3 {...nodeProps}>{domToReact(children, options)}</H3>
        case "h4":
          return <H4 {...nodeProps}>{domToReact(children, options)}</H4>
        case "h5":
          return <H5 {...nodeProps}>{domToReact(children, options)}</H5>
        case "h6":
          return <H6 {...nodeProps}>{domToReact(children, options)}</H6>
        case "b":
        case "cite":
        case "dt":
        case "pre":
        case "code":
        case "dl":
        case "dd":
        case "i":
        case "aside":
        case "abbr":
        case "span":
        case "blockquote":
        case "ul":
        case "ol":
        case "li":
        case "table":
        case "tbody":
        case "th":
        case "td":
        case "tr":
        case "strong":
        case "em":
        case "s":
        case "sub":
        case "sup":
        case "thead":
        case "tfoot":
        case "caption":
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        // Void element tags like <br>, <hr>, <source>, etc.
        // @see https://developer.mozilla.org/en-US/docs/Glossary/Void_element
        default:
          return <NodeName {...nodeProps}/>;
      }
    }
  }
}

const fixClasses = (classes: string | boolean = ''): undefined | string => {
  if (!classes) return undefined;
  // Pass the classes so that we can easily replace a whole class instead of parts of them.
  classes = ` ${classes} `;
  classes = classes.replace(' su-', ' ')
    .replace(' text-align-center ', ' text-center ')
    .replace(' text-align-right ', ' text-right ')
    .replace(' align-left ', ' float-left mr-10 mb-10 ')
    .replace(' align-right ', ' float-right ml-10 mb-10 ')
    .replace(' visually-hidden ', ' sr-only ')
    .replace(' font-splash ', ' splash-text text-m4 ')
    .replace(' callout-text ', ' font-bold text-m2 ')
    .replace(' related-text ', ' shadow-lg border border-black-20 p-16 ')
    .replace(' drop-cap ', ' text-m1 first-letter:font-bold first-letter:text-m5 first-letter:float-left first-letter:my-2 first-letter:mr-4 ')
    .replace(/tablesaw.*? /g, ' ')
    .replace(/ +/g, ' ')
    .trim();

  classes = classes.split(' ')
    .filter(className => className.trim().length >= 1)
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(' ');
  return classes.trim();
}

const cleanMediaMarkup = (node: Element) => {
  const nodeProps = attributesToProps(node.attribs);
  nodeProps.className = fixClasses(nodeProps.className) ?? '';

  const getImage = (node: Element): ComponentProps<any> | undefined => {
    let img;
    if (node.name === 'img') {
      const attribs = node.attribs;
      attribs.width = attribs.width ?? attribs['data-width'];
      attribs.height = attribs.height ?? attribs['data-height'];
      return attribs;
    }
    if (node.children.length > 0) {
      for (let child of node.children) {
        if (child instanceof Element) {
          img = getImage(child);
          if (img) return img;
        }
      }
    }
  }
  const getFigCaption = (node: Element): DOMNode[] | undefined => {
    let caption;
    if (node.name === 'figcaption') {
      return node.children as DOMNode[];
    }
    if (node.children.length > 0) {
      for (let child of node.children) {
        if (child instanceof Element) {
          caption = getFigCaption(child);
          if (caption) return caption;
        }
      }
    }
  }

  const getOembedUrl = (node: Element): string | undefined => {
    const src = node.attribs?.src;
    if (src?.startsWith('/media/oembed')) {
      return decodeURIComponent(src as string).replace(/^.*url=(.*)?&.*$/, '$1');
    }
    if (node.children.length > 0) {
      for (let child of node.children) {
        if (child instanceof Element) {
          const url: string | undefined = getOembedUrl(child);
          if (url) return url;
        }
      }
    }
  }

  // Special handling of Oembeds
  const oembedUrl = getOembedUrl(node);
  if (oembedUrl) {
    return (
      <Oembed url={oembedUrl}/>
    );
  }

  const image = getImage(node);
  if (image) {
    let {src, alt, width, height} = image;

    if (src.startsWith('/')) {
      src = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + src;
    }
    const figCaption = getFigCaption(node);

    if (figCaption) {
      nodeProps.className += ' table';
      delete nodeProps.role;
      return (
        <figure {...nodeProps}>
          <WysiwygImage src={src} alt={alt} height={height} width={width}/>
          <figcaption
            className="table-caption caption-bottom text-center">{domToReact(figCaption, options)}</figcaption>
        </figure>
      )
    }
    return (
      <WysiwygImage
        src={src}
        alt={alt}
        height={height}
        width={width}
        {...nodeProps}
      />
    )
  }
  let NodeName: React.ElementType = node.name as React.ElementType
  return <NodeName {...nodeProps}>{domToReact(node.children as DOMNode[], options)}</NodeName>
}

const WysiwygImage = ({src, alt, height, width, className = ''}: {
  src: string,
  alt?: string,
  height?: string,
  width?: string,
  className?: string
}) => {
  if (width && height) {
    return (
      <Image
        className={fixClasses(className)}
        src={src.trim()}
        alt={alt ? alt.trim() : ""}
        height={parseInt(height)}
        width={parseInt(width)}
      />
    )
  }
  return (
    <div className="overflow-hidden aspect-[16/9] w-full relative mb-10">
      <Image
        className="object-cover object-center"
        src={src.trim()}
        alt={alt ? alt.trim() : ""}
        fill={true}
      />
    </div>
  )
}


const formatHtml = (html: string) => parse(html ?? '', options);


export default Wysiwyg;