
import Link from "@/components/elements/link";
import parse, {HTMLReactParserOptions, Element, domToReact, attributesToProps} from "html-react-parser"
import Image from "next/image";
import Oembed from "@/components/elements/ombed";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  html: string;
}

const Wysiwyg = ({html, className = "", ...props}: Props) => {
  className += " wysiwyg"

  return (
    <div className={className.trim()} {...props}>
      {formatHtml(html)}
    </div>
  )
}

const options: HTMLReactParserOptions = {
  replace: (domNode) => {

    if (domNode instanceof Element) {
      const nodeProps = attributesToProps(domNode.attribs);
      nodeProps.className = fixClasses(nodeProps.className ?? '').trim();
      let NodeName: string = domNode.name

      switch (domNode.name) {
        case "a":
          return (
            <Link href={nodeProps.href} {...nodeProps}>
              {domToReact(domNode.children, options)}
            </Link>
          )

        case "div":
          delete nodeProps.role;
          if (nodeProps.className?.indexOf('media-entity-wrapper') >= 0) {
            return cleanMediaMarkup(domNode);
          }
          return <NodeName {...nodeProps}>{domToReact(domNode.children, options)}</NodeName>

        case 'figure':
          return cleanMediaMarkup(domNode);

        case 'p':
          nodeProps.className += ' max-w-[100ch]';
          nodeProps.className = nodeProps.className.trim()
          return <NodeName {...nodeProps}>{domToReact(domNode.children, options)}</NodeName>

        case 'script':
          return <></>;

        case "h2":
        case "h3":
        case "h4":
        case "h5":
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
          return <NodeName {...nodeProps}>{domToReact(domNode.children, options)}</NodeName>

        // Void element tags like <br>, <hr>, <source>, etc.
        // @see https://developer.mozilla.org/en-US/docs/Glossary/Void_element
        default:
          return <NodeName {...nodeProps}/>;
      }
    }
  }
}

const fixClasses = (classes) => {
  classes = ` ${classes} `;
  classes = classes.replace(' su-', ' ')
    .replace(' text-align-center ', ' text-center ')
    .replace(' text-align-right ', ' text-right ')
    .replace(' align-left ', ' float-left mr-10 mb-10 ')
    .replace(' align-right ', ' float-right ml-10 mb-10 ')
    .replace(' button ', ' inline-block bg-digital-red hocus:bg-black text-white hocus:text-white mx-3 px-10 py-5 no-underline hocus:underline transition ')
    .replace(' button--big ', ' inline-block bg-digital-red hocus:bg-black text-white hocus:text-white px-20 py-10 no-underline hocus:underline transition text-center text-m2 font-normal ')
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
  return classes;
}

const cleanMediaMarkup = async (node: Element) => {
  const nodeProps = attributesToProps(node.attribs);
  nodeProps.className = fixClasses(nodeProps.className ?? '').trim();

  const getImage = (node: Element) => {
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
  const getFigCaption = (node: Element) => {
    let caption;
    if (node.name === 'figcaption') {
      return node.children;
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

  const getOembedUrl = (node:Element) => {
    const src = node.attribs?.src;
    if (src?.startsWith('/media/oembed')) {
      return decodeURIComponent(src as string).replace(/^.*url=(.*)?&.*$/, '$1');
    }
    if (node.children.length > 0) {
      for (let child of node.children) {
        if (child instanceof Element) {
          const url = getOembedUrl(child);
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
  let NodeName: string = node.name
  return <NodeName {...nodeProps}>{domToReact(node.children, options)}</NodeName>
}

const WysiwygImage = ({src, alt, height, width, className}) => {
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


const formatHtml = (html) => parse(html ?? '', options);


export default Wysiwyg;