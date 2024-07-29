import { HTTPMethod } from 'http-method-enum'
import path from 'path'
import { DIR_NAME } from './constants.js'

const defaultConfig = {
  method: HTTPMethod.GET,
  contentType: 'Content-Type: text/html; charset=utf-8',
  filePath: path.join(DIR_NAME, 'public', 'index.html')
}

export const routes = Object.freeze({
  '/': defaultConfig,
  '/about': {
    ...defaultConfig,
    filePath: path.join(DIR_NAME, 'public', 'about.html')
  },
  '/contact-me': {
    ...defaultConfig,
    filePath: path.join(DIR_NAME, 'public', 'contact-me.html')
  },
  '/404': {
    ...defaultConfig,
    filePath: path.join(DIR_NAME, 'public', '404.html')
  }
})

export type Path = keyof typeof routes

export function getPaths(): Path[] {
  return Object.keys(routes) as Path[]
}
