import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RsvpController::cancel
 * @see app/Http/Controllers/RsvpController.php:111
 * @route '/rsvp/{rsvpID}/cancel'
 */
export const cancel = (args: { rsvpID: string | number } | [rsvpID: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/rsvp/{rsvpID}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RsvpController::cancel
 * @see app/Http/Controllers/RsvpController.php:111
 * @route '/rsvp/{rsvpID}/cancel'
 */
cancel.url = (args: { rsvpID: string | number } | [rsvpID: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cancel.definition.url
            .replace('{rsvpID}', parsedArgs.rsvpID.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RsvpController::cancel
 * @see app/Http/Controllers/RsvpController.php:111
 * @route '/rsvp/{rsvpID}/cancel'
 */
cancel.post = (args: { rsvpID: string | number } | [rsvpID: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RsvpController::cancel
 * @see app/Http/Controllers/RsvpController.php:111
 * @route '/rsvp/{rsvpID}/cancel'
 */
    const cancelForm = (args: { rsvpID: string | number } | [rsvpID: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RsvpController::cancel
 * @see app/Http/Controllers/RsvpController.php:111
 * @route '/rsvp/{rsvpID}/cancel'
 */
        cancelForm.post = (args: { rsvpID: string | number } | [rsvpID: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
/**
* @see \App\Http\Controllers\RsvpController::store
 * @see app/Http/Controllers/RsvpController.php:12
 * @route '/rsvp'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rsvp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RsvpController::store
 * @see app/Http/Controllers/RsvpController.php:12
 * @route '/rsvp'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RsvpController::store
 * @see app/Http/Controllers/RsvpController.php:12
 * @route '/rsvp'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RsvpController::store
 * @see app/Http/Controllers/RsvpController.php:12
 * @route '/rsvp'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RsvpController::store
 * @see app/Http/Controllers/RsvpController.php:12
 * @route '/rsvp'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const rsvp = {
    store: Object.assign(store, store),
}

export default rsvp