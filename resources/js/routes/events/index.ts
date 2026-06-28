import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\EventController::history
 * @see app/Http/Controllers/EventController.php:65
 * @route '/history'
 */
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventController::history
 * @see app/Http/Controllers/EventController.php:65
 * @route '/history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::history
 * @see app/Http/Controllers/EventController.php:65
 * @route '/history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventController::history
 * @see app/Http/Controllers/EventController.php:65
 * @route '/history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EventController::history
 * @see app/Http/Controllers/EventController.php:65
 * @route '/history'
 */
    const historyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EventController::history
 * @see app/Http/Controllers/EventController.php:65
 * @route '/history'
 */
        historyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EventController::history
 * @see app/Http/Controllers/EventController.php:65
 * @route '/history'
 */
        historyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
/**
* @see \App\Http\Controllers\EventController::assignAdmin
 * @see app/Http/Controllers/EventController.php:250
 * @route '/events/{event}/assign-admin'
 */
export const assignAdmin = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAdmin.url(args, options),
    method: 'post',
})

assignAdmin.definition = {
    methods: ["post"],
    url: '/events/{event}/assign-admin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EventController::assignAdmin
 * @see app/Http/Controllers/EventController.php:250
 * @route '/events/{event}/assign-admin'
 */
assignAdmin.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return assignAdmin.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::assignAdmin
 * @see app/Http/Controllers/EventController.php:250
 * @route '/events/{event}/assign-admin'
 */
assignAdmin.post = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAdmin.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EventController::assignAdmin
 * @see app/Http/Controllers/EventController.php:250
 * @route '/events/{event}/assign-admin'
 */
    const assignAdminForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assignAdmin.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EventController::assignAdmin
 * @see app/Http/Controllers/EventController.php:250
 * @route '/events/{event}/assign-admin'
 */
        assignAdminForm.post = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assignAdmin.url(args, options),
            method: 'post',
        })
    
    assignAdmin.form = assignAdminForm
/**
* @see \App\Http\Controllers\EventController::removeAdmin
 * @see app/Http/Controllers/EventController.php:268
 * @route '/events/{event}/remove-admin'
 */
export const removeAdmin = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeAdmin.url(args, options),
    method: 'post',
})

removeAdmin.definition = {
    methods: ["post"],
    url: '/events/{event}/remove-admin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EventController::removeAdmin
 * @see app/Http/Controllers/EventController.php:268
 * @route '/events/{event}/remove-admin'
 */
removeAdmin.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return removeAdmin.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::removeAdmin
 * @see app/Http/Controllers/EventController.php:268
 * @route '/events/{event}/remove-admin'
 */
removeAdmin.post = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeAdmin.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EventController::removeAdmin
 * @see app/Http/Controllers/EventController.php:268
 * @route '/events/{event}/remove-admin'
 */
    const removeAdminForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeAdmin.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EventController::removeAdmin
 * @see app/Http/Controllers/EventController.php:268
 * @route '/events/{event}/remove-admin'
 */
        removeAdminForm.post = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeAdmin.url(args, options),
            method: 'post',
        })
    
    removeAdmin.form = removeAdminForm