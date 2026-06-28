import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RsvpController::getTomorrowReminders
 * @see app/Http/Controllers/RsvpController.php:158
 * @route '/api/events/reminder-tomorrow'
 */
export const getTomorrowReminders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTomorrowReminders.url(options),
    method: 'get',
})

getTomorrowReminders.definition = {
    methods: ["get","head"],
    url: '/api/events/reminder-tomorrow',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RsvpController::getTomorrowReminders
 * @see app/Http/Controllers/RsvpController.php:158
 * @route '/api/events/reminder-tomorrow'
 */
getTomorrowReminders.url = (options?: RouteQueryOptions) => {
    return getTomorrowReminders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RsvpController::getTomorrowReminders
 * @see app/Http/Controllers/RsvpController.php:158
 * @route '/api/events/reminder-tomorrow'
 */
getTomorrowReminders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTomorrowReminders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RsvpController::getTomorrowReminders
 * @see app/Http/Controllers/RsvpController.php:158
 * @route '/api/events/reminder-tomorrow'
 */
getTomorrowReminders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTomorrowReminders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RsvpController::getTomorrowReminders
 * @see app/Http/Controllers/RsvpController.php:158
 * @route '/api/events/reminder-tomorrow'
 */
    const getTomorrowRemindersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getTomorrowReminders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RsvpController::getTomorrowReminders
 * @see app/Http/Controllers/RsvpController.php:158
 * @route '/api/events/reminder-tomorrow'
 */
        getTomorrowRemindersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getTomorrowReminders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RsvpController::getTomorrowReminders
 * @see app/Http/Controllers/RsvpController.php:158
 * @route '/api/events/reminder-tomorrow'
 */
        getTomorrowRemindersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getTomorrowReminders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getTomorrowReminders.form = getTomorrowRemindersForm
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
* @see \App\Http\Controllers\RsvpController::index
 * @see app/Http/Controllers/RsvpController.php:39
 * @route '/rsvp'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rsvp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RsvpController::index
 * @see app/Http/Controllers/RsvpController.php:39
 * @route '/rsvp'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RsvpController::index
 * @see app/Http/Controllers/RsvpController.php:39
 * @route '/rsvp'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RsvpController::index
 * @see app/Http/Controllers/RsvpController.php:39
 * @route '/rsvp'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RsvpController::index
 * @see app/Http/Controllers/RsvpController.php:39
 * @route '/rsvp'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RsvpController::index
 * @see app/Http/Controllers/RsvpController.php:39
 * @route '/rsvp'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RsvpController::index
 * @see app/Http/Controllers/RsvpController.php:39
 * @route '/rsvp'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
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
/**
* @see \App\Http\Controllers\RsvpController::userIndex
 * @see app/Http/Controllers/RsvpController.php:82
 * @route '/my-rsvps'
 */
export const userIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userIndex.url(options),
    method: 'get',
})

userIndex.definition = {
    methods: ["get","head"],
    url: '/my-rsvps',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RsvpController::userIndex
 * @see app/Http/Controllers/RsvpController.php:82
 * @route '/my-rsvps'
 */
userIndex.url = (options?: RouteQueryOptions) => {
    return userIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RsvpController::userIndex
 * @see app/Http/Controllers/RsvpController.php:82
 * @route '/my-rsvps'
 */
userIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RsvpController::userIndex
 * @see app/Http/Controllers/RsvpController.php:82
 * @route '/my-rsvps'
 */
userIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RsvpController::userIndex
 * @see app/Http/Controllers/RsvpController.php:82
 * @route '/my-rsvps'
 */
    const userIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RsvpController::userIndex
 * @see app/Http/Controllers/RsvpController.php:82
 * @route '/my-rsvps'
 */
        userIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RsvpController::userIndex
 * @see app/Http/Controllers/RsvpController.php:82
 * @route '/my-rsvps'
 */
        userIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userIndex.form = userIndexForm
const RsvpController = { getTomorrowReminders, cancel, index, store, userIndex }

export default RsvpController