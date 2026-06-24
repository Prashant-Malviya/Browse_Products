import { lazy } from 'react'

export const Home = lazy(() => import('@/pages/Home').then((module) => ({ default: module.Home })))
export const Products = lazy(() => import('@/pages/Products').then((module) => ({ default: module.Products })))
export const Api = lazy(() => import('@/pages/Api').then((module) => ({ default: module.Api })))
export const About = lazy(() => import('@/pages/About').then((module) => ({ default: module.About })))
export const Contact = lazy(() => import('@/pages/Contact').then((module) => ({ default: module.Contact })))
