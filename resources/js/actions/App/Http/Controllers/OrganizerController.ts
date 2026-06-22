import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\OrganizerController::cancelRsvp
 * @see app/Http/Controllers/OrganizerController.php:64
 * @route '/organizer/rsvps/{rsvpID}/cancel'
 */
export const cancelRsvp = (args: { rsvpID: string | number } | [rsvpID: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelRsvp.url(args, options),
    method: 'post',
})

cancelRsvp.definition = {
    methods: ["post"],
    url: '/organizer/rsvps/{rsvpID}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OrganizerController::cancelRsvp
 * @see app/Http/Controllers/OrganizerController.php:64
 * @route '/organizer/rsvps/{rsvpID}/cancel'
 */
cancelRsvp.url = (args: { rsvpID: string | number } | [rsvpID: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { rsvpID: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    rsvpID: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        rsvpID: args.rsvpID,
                }

    return cancelRsvp.definition.url
            .replace('{rsvpID}', parsedArgs.rsvpID.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrganizerController::cancelRsvp
 * @see app/Http/Controllers/OrganizerController.php:64
 * @route '/organizer/rsvps/{rsvpID}/cancel'
 */
cancelRsvp.post = (args: { rsvpID: string | number } | [rsvpID: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelRsvp.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\OrganizerController::cancelRsvp
 * @see app/Http/Controllers/OrganizerController.php:64
 * @route '/organizer/rsvps/{rsvpID}/cancel'
 */
    const cancelRsvpForm = (args: { rsvpID: string | number } | [rsvpID: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancelRsvp.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\OrganizerController::cancelRsvp
 * @see app/Http/Controllers/OrganizerController.php:64
 * @route '/organizer/rsvps/{rsvpID}/cancel'
 */
        cancelRsvpForm.post = (args: { rsvpID: string | number } | [rsvpID: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancelRsvp.url(args, options),
            method: 'post',
        })
    
    cancelRsvp.form = cancelRsvpForm
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
/**
* @see \App\Http\Controllers\OrganizerController::seatManage
 * @see app/Http/Controllers/OrganizerController.php:119
 * @route '/organizer/events/{event}/seats'
 */
export const seatManage = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seatManage.url(args, options),
    method: 'get',
})

seatManage.definition = {
    methods: ["get","head"],
    url: '/organizer/events/{event}/seats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrganizerController::seatManage
 * @see app/Http/Controllers/OrganizerController.php:119
 * @route '/organizer/events/{event}/seats'
 */
seatManage.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'eventID' in args) {
            args = { event: args.eventID }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.eventID
                : args.event,
                }

    return seatManage.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrganizerController::seatManage
 * @see app/Http/Controllers/OrganizerController.php:119
 * @route '/organizer/events/{event}/seats'
 */
seatManage.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seatManage.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrganizerController::seatManage
 * @see app/Http/Controllers/OrganizerController.php:119
 * @route '/organizer/events/{event}/seats'
 */
seatManage.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: seatManage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrganizerController::seatManage
 * @see app/Http/Controllers/OrganizerController.php:119
 * @route '/organizer/events/{event}/seats'
 */
    const seatManageForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: seatManage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrganizerController::seatManage
 * @see app/Http/Controllers/OrganizerController.php:119
 * @route '/organizer/events/{event}/seats'
 */
        seatManageForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seatManage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrganizerController::seatManage
 * @see app/Http/Controllers/OrganizerController.php:119
 * @route '/organizer/events/{event}/seats'
 */
        seatManageForm.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seatManage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    seatManage.form = seatManageForm
/**
* @see \App\Http\Controllers\OrganizerController::eventManage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
export const eventManage = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventManage.url(args, options),
    method: 'get',
})

eventManage.definition = {
    methods: ["get","head"],
    url: '/organizer/events/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrganizerController::eventManage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
eventManage.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return eventManage.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrganizerController::eventManage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
eventManage.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventManage.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrganizerController::eventManage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
eventManage.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventManage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrganizerController::eventManage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
    const eventManageForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: eventManage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrganizerController::eventManage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
        eventManageForm.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: eventManage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrganizerController::eventManage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
        eventManageForm.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: eventManage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    eventManage.form = eventManageForm
const OrganizerController = { dashboard, events, rsvps, cancelRsvp, seats, seatManage, eventManage }

export default OrganizerController