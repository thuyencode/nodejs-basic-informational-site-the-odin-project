import { HttpMethod, HttpStatus } from 'http-status-ts'
import path from 'path'
import { CURRENT_DIR } from './constants.js'

function getPublicFilePath(filename: string) {
  return path.join(path.dirname(CURRENT_DIR), 'public', filename)
}

const defaultConfig = {
  method: HttpMethod.GET,
  statusCode: HttpStatus.OK,
  contentType: { 'Content-Type': 'text/html; charset=utf-8' },
  filePath: getPublicFilePath('index.html')
}

export const routes = {
  '/': defaultConfig,
  '/about': {
    ...defaultConfig,
    filePath: getPublicFilePath('about.html')
  },
  '/contact-me': {
    ...defaultConfig,
    filePath: getPublicFilePath('contact-me.html')
  },
  '/404': {
    ...defaultConfig,
    filePath: getPublicFilePath('404.html')
  },
  '/styles.css': {
    ...defaultConfig,
    contentType: { 'Content-Type': 'text/css; charset=utf-8' },
    filePath: getPublicFilePath('styles.css')
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
