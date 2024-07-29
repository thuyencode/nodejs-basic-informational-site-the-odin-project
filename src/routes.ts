import { HTTPMethod } from 'http-method-enum'
import HTTP_STATUS_CODES from 'http-status-enum'
import path from 'path'
import { DIR_NAME } from './constants.js'

const defaultConfig = {
  method: HTTPMethod.GET,
  statusCode: HTTP_STATUS_CODES.default.OK,
  contentType: { 'Content-Type': 'text/html; charset=utf-8' },
  filePath: path.join(path.dirname(DIR_NAME), 'public', 'index.html')
}

export const routes = {
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
} as const

export type Path = keyof typeof routes

export function getPaths(): Path[] {
  return Object.keys(routes) as Path[]
}

export type Route = typeof defaultConfig

export function getPath(path: string): Route | undefined {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return routes[path]
}
