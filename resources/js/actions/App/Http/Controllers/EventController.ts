import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EventController::assignAdmin
 * @see app/Http/Controllers/EventController.php:163
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
 * @see app/Http/Controllers/EventController.php:163
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
 * @see app/Http/Controllers/EventController.php:163
 * @route '/events/{event}/assign-admin'
 */
assignAdmin.post = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAdmin.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EventController::assignAdmin
 * @see app/Http/Controllers/EventController.php:163
 * @route '/events/{event}/assign-admin'
 */
    const assignAdminForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assignAdmin.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EventController::assignAdmin
 * @see app/Http/Controllers/EventController.php:163
 * @route '/events/{event}/assign-admin'
 */
        assignAdminForm.post = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assignAdmin.url(args, options),
            method: 'post',
        })
    
    assignAdmin.form = assignAdminForm
/**
* @see \App\Http\Controllers\EventController::removeAdmin
 * @see app/Http/Controllers/EventController.php:181
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
 * @see app/Http/Controllers/EventController.php:181
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
 * @see app/Http/Controllers/EventController.php:181
 * @route '/events/{event}/remove-admin'
 */
removeAdmin.post = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeAdmin.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EventController::removeAdmin
 * @see app/Http/Controllers/EventController.php:181
 * @route '/events/{event}/remove-admin'
 */
    const removeAdminForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeAdmin.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EventController::removeAdmin
 * @see app/Http/Controllers/EventController.php:181
 * @route '/events/{event}/remove-admin'
 */
        removeAdminForm.post = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeAdmin.url(args, options),
            method: 'post',
        })
    
    removeAdmin.form = removeAdminForm
/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
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
* @see \App\Http\Controllers\EventController::store
 * @see app/Http/Controllers/EventController.php:50
 * @route '/events'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/events',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EventController::store
 * @see app/Http/Controllers/EventController.php:50
 * @route '/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::store
 * @see app/Http/Controllers/EventController.php:50
 * @route '/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EventController::store
 * @see app/Http/Controllers/EventController.php:50
 * @route '/events'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EventController::store
 * @see app/Http/Controllers/EventController.php:50
 * @route '/events'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\EventController::update
 * @see app/Http/Controllers/EventController.php:91
 * @route '/events/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/events/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EventController::update
 * @see app/Http/Controllers/EventController.php:91
 * @route '/events/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::update
 * @see app/Http/Controllers/EventController.php:91
 * @route '/events/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EventController::update
 * @see app/Http/Controllers/EventController.php:91
 * @route '/events/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EventController::update
 * @see app/Http/Controllers/EventController.php:91
 * @route '/events/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\EventController::deleteMethod
 * @see app/Http/Controllers/EventController.php:147
 * @route '/events/{event}/delete'
 */
export const deleteMethod = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteMethod.url(args, options),
    method: 'post',
})

deleteMethod.definition = {
    methods: ["post"],
    url: '/events/{event}/delete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EventController::deleteMethod
 * @see app/Http/Controllers/EventController.php:147
 * @route '/events/{event}/delete'
 */
deleteMethod.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return deleteMethod.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::deleteMethod
 * @see app/Http/Controllers/EventController.php:147
 * @route '/events/{event}/delete'
 */
deleteMethod.post = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteMethod.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EventController::deleteMethod
 * @see app/Http/Controllers/EventController.php:147
 * @route '/events/{event}/delete'
 */
    const deleteMethodForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EventController::deleteMethod
 * @see app/Http/Controllers/EventController.php:147
 * @route '/events/{event}/delete'
 */
        deleteMethodForm.post = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url(args, options),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
/**
* @see \App\Http\Controllers\EventController::userIndex
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
export const userIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userIndex.url(options),
    method: 'get',
})

userIndex.definition = {
    methods: ["get","head"],
    url: '/uevents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventController::userIndex
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
userIndex.url = (options?: RouteQueryOptions) => {
    return userIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::userIndex
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
userIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventController::userIndex
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
userIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EventController::userIndex
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
    const userIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EventController::userIndex
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
        userIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EventController::userIndex
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
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
const EventController = { assignAdmin, removeAdmin, index, store, update, deleteMethod, userIndex, delete: deleteMethod }

export default EventController