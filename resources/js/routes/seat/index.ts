import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:72
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
 * @see app/Http/Controllers/SeatController.php:72
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
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/select-seat'
 */
select.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: select.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/select-seat'
 */
select.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: select.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/select-seat'
 */
    const selectForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: select.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:72
 * @route '/events/{event}/select-seat'
 */
        selectForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: select.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::select
 * @see app/Http/Controllers/SeatController.php:72
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
const seat = {
    select: Object.assign(select, select),
}

export default seat