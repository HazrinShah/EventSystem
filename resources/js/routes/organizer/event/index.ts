import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
export const manage = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(args, options),
    method: 'get',
})

manage.definition = {
    methods: ["get","head"],
    url: '/organizer/events/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
manage.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return manage.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
manage.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
manage.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
    const manageForm = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
        manageForm.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrganizerController::manage
 * @see app/Http/Controllers/OrganizerController.php:29
 * @route '/organizer/events/{event}'
 */
        manageForm.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    manage.form = manageForm
const event = {
    manage: Object.assign(manage, manage),
}

export default event