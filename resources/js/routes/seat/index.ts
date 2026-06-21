import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:112
 * @route '/events/{event}/select-seat'
 */
export const select = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: select.url(args, options),
    method: 'get',
})

select.definition = {
    methods: ["get","head"],
    url: '/events/{event}/select-seat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:112
 * @route '/events/{event}/select-seat'
 */
select.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return select.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:112
 * @route '/events/{event}/select-seat'
 */
select.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: select.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:112
 * @route '/events/{event}/select-seat'
 */
select.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: select.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:112
 * @route '/events/{event}/select-seat'
 */
    const selectForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: select.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:112
 * @route '/events/{event}/select-seat'
 */
        selectForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: select.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:112
 * @route '/events/{event}/select-seat'
 */
        selectForm.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: select.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    select.form = selectForm
/**
* @see \App\Http\Controllers\SeatController::view
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/seat-view'
 */
export const view = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/events/{event}/seat-view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeatController::view
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/seat-view'
 */
view.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return view.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::view
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/seat-view'
 */
view.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::view
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/seat-view'
 */
view.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::view
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/seat-view'
 */
    const viewForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: view.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::view
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/seat-view'
 */
        viewForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::view
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/seat-view'
 */
        viewForm.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    view.form = viewForm
const seat = {
    select: Object.assign(select, select),
view: Object.assign(view, view),
}

export default seat