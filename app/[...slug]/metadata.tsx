import {DrupalNode} from "next-drupal";
import {BasicPageNodeType} from "@/lib/types";

export const getNodeMetadata = (node: DrupalNode) => {
  const defaultData = {
    title: node.title,
  }
  switch (node.type) {
    case 'node--stanford_page':
      return {
        ...getBasicPageMetaData(node),
        ...defaultData
      }

    case 'node--stanford_news':
      return {
        ...getNewsMetaData(node),
        ...defaultData
      }

    case 'node--stanford_event':
      return {
        ...getEventMetaData(node),
        ...defaultData
      }

    case 'node--stanford_person':
      return {
        ...getPersonMetaData(node),
        ...defaultData
      }
  }
}

const getBasicPageMetaData = (node: BasicPageNodeType) => {
  return {}
}

const getNewsMetaData = (node: BasicPageNodeType) => {
  return {}
}

const getPersonMetaData = (node: BasicPageNodeType) => {
  return {}
}

const getEventMetaData = (node: BasicPageNodeType) => {
  return {}
}
