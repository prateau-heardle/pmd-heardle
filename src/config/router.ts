import { createRouter, defineRoute } from 'type-route'

export enum ROUTES {
    DAILY = 'daily',
    INFINITE = 'infinite'
}

export const { RouteProvider, useRoute, routes } = createRouter({
    [ROUTES.DAILY]: defineRoute('/'),
    [ROUTES.INFINITE]: defineRoute('/infinite')
})
