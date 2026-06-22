import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import seats98f93e from './seats'
import event from './event'
/**
* @see \App\Http\Controllers\OrganizerController::dashboard
 * @see app/Http/Controllers/OrganizerController.php:12
 * @route '/organizer/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/organizer/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrganizerController::dashboard
 * @see app/Http/Controllers/OrganizerController.php:12
 * @route '/organizer/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrganizerController::dashboard
 * @see app/Http/Controllers/OrganizerController.php:12
 * @route '/organizer/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrganizerController::dashboard
 * @see app/Http/Controllers/OrganizerController.php:12
 * @route '/organizer/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrganizerController::dashboard
 * @see app/Http/Controllers/OrganizerController.php:12
 * @route '/organizer/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrganizerController::dashboard
 * @see app/Http/Controllers/OrganizerController.php:12
 * @route '/organizer/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrganizerController::dashboard
 * @see app/Http/Controllers/OrganizerController.php:12
 * @route '/organizer/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\OrganizerController::events
 * @see app/Http/Controllers/OrganizerController.php:44
 * @route '/organizer/events'
 */
export const events = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})

events.definition = {
    methods: ["get","head"],
    url: '/organizer/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrganizerController::events
 * @see app/Http/Controllers/OrganizerController.php:44
 * @route '/organizer/events'
 */
events.url = (options?: RouteQueryOptions) => {
    return events.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrganizerController::events
 * @see app/Http/Controllers/OrganizerController.php:44
 * @route '/organizer/events'
 */
events.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrganizerController::events
 * @see app/Http/Controllers/OrganizerController.php:44
 * @route '/organizer/events'
 */
events.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: events.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrganizerController::events
 * @see app/Http/Controllers/OrganizerController.php:44
 * @route '/organizer/events'
 */
    const eventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: events.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrganizerController::events
 * @see app/Http/Controllers/OrganizerController.php:44
 * @route '/organizer/events'
 */
        eventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: events.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrganizerController::events
 * @see app/Http/Controllers/OrganizerController.php:44
 * @route '/organizer/events'
 */
        eventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: events.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    events.form = eventsForm
/**
* @see \App\Http\Controllers\OrganizerController::rsvps
 * @see app/Http/Controllers/OrganizerController.php:52
 * @route '/organizer/rsvps'
 */
export const rsvps = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rsvps.url(options),
    method: 'get',
})

rsvps.definition = {
    methods: ["get","head"],
    url: '/organizer/rsvps',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrganizerController::rsvps
 * @see app/Http/Controllers/OrganizerController.php:52
 * @route '/organizer/rsvps'
 */
rsvps.url = (options?: RouteQueryOptions) => {
    return rsvps.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrganizerController::rsvps
 * @see app/Http/Controllers/OrganizerController.php:52
 * @route '/organizer/rsvps'
 */
rsvps.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rsvps.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrganizerController::rsvps
 * @see app/Http/Controllers/OrganizerController.php:52
 * @route '/organizer/rsvps'
 */
rsvps.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rsvps.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrganizerController::rsvps
 * @see app/Http/Controllers/OrganizerController.php:52
 * @route '/organizer/rsvps'
 */
    const rsvpsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rsvps.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrganizerController::rsvps
 * @see app/Http/Controllers/OrganizerController.php:52
 * @route '/organizer/rsvps'
 */
        rsvpsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rsvps.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrganizerController::rsvps
 * @see app/Http/Controllers/OrganizerController.php:52
 * @route '/organizer/rsvps'
 */
        rsvpsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rsvps.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    rsvps.form = rsvpsForm
/**
* @see \App\Http\Controllers\OrganizerController::seats
 * @see app/Http/Controllers/OrganizerController.php:95
 * @route '/organizer/seats'
 */
export const seats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seats.url(options),
    method: 'get',
})

seats.definition = {
    methods: ["get","head"],
    url: '/organizer/seats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrganizerController::seats
 * @see app/Http/Controllers/OrganizerController.php:95
 * @route '/organizer/seats'
 */
seats.url = (options?: RouteQueryOptions) => {
    return seats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrganizerController::seats
 * @see app/Http/Controllers/OrganizerController.php:95
 * @route '/organizer/seats'
 */
seats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrganizerController::seats
 * @see app/Http/Controllers/OrganizerController.php:95
 * @route '/organizer/seats'
 */
seats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: seats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrganizerController::seats
 * @see app/Http/Controllers/OrganizerController.php:95
 * @route '/organizer/seats'
 */
    const seatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: seats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrganizerController::seats
 * @see app/Http/Controllers/OrganizerController.php:95
 * @route '/organizer/seats'
 */
        seatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrganizerController::seats
 * @see app/Http/Controllers/OrganizerController.php:95
 * @route '/organizer/seats'
 */
        seatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    seats.form = seatsForm
const organizer = {
    dashboard: Object.assign(dashboard, dashboard),
events: Object.assign(events, events),
rsvps: Object.assign(rsvps, rsvps),
seats: Object.assign(seats, seats98f93e),
event: Object.assign(event, event),
}

export default organizer