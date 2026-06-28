import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:123
 * @route '/organizer/events/{event}/seats'
 */
export const manage = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(args, options),
    method: 'get',
})

manage.definition = {
    methods: ["get","head"],
    url: '/organizer/events/{event}/seats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:123
 * @route '/organizer/events/{event}/seats'
 */
manage.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return manage.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:123
 * @route '/organizer/events/{event}/seats'
 */
manage.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:123
 * @route '/organizer/events/{event}/seats'
 */
manage.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:123
 * @route '/organizer/events/{event}/seats'
 */
    const manageForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:123
 * @route '/organizer/events/{event}/seats'
 */
        manageForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:123
 * @route '/organizer/events/{event}/seats'
 */
        manageForm.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    manage.form = manageForm
const seats = {
    manage: Object.assign(manage, manage),
}

export default seats