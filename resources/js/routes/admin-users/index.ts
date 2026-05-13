import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\UserController::store
 * @see app/Http/Controllers/UserController.php:17
 * @route '/admin-users'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin-users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::store
 * @see app/Http/Controllers/UserController.php:17
 * @route '/admin-users'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::store
 * @see app/Http/Controllers/UserController.php:17
 * @route '/admin-users'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserController::store
 * @see app/Http/Controllers/UserController.php:17
 * @route '/admin-users'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserController::store
 * @see app/Http/Controllers/UserController.php:17
 * @route '/admin-users'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\UserController::update
 * @see app/Http/Controllers/UserController.php:33
 * @route '/admin-users/{user}'
 */
export const update = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin-users/{user}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::update
 * @see app/Http/Controllers/UserController.php:33
 * @route '/admin-users/{user}'
 */
update.url = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'userID' in args) {
            args = { user: args.userID }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.userID
                : args.user,
                }

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::update
 * @see app/Http/Controllers/UserController.php:33
 * @route '/admin-users/{user}'
 */
update.post = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserController::update
 * @see app/Http/Controllers/UserController.php:33
 * @route '/admin-users/{user}'
 */
    const updateForm = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserController::update
 * @see app/Http/Controllers/UserController.php:33
 * @route '/admin-users/{user}'
 */
        updateForm.post = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\UserController::deactivate
 * @see app/Http/Controllers/UserController.php:53
 * @route '/admin-users/{user}/deactivate'
 */
export const deactivate = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deactivate.url(args, options),
    method: 'post',
})

deactivate.definition = {
    methods: ["post"],
    url: '/admin-users/{user}/deactivate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::deactivate
 * @see app/Http/Controllers/UserController.php:53
 * @route '/admin-users/{user}/deactivate'
 */
deactivate.url = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'userID' in args) {
            args = { user: args.userID }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.userID
                : args.user,
                }

    return deactivate.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::deactivate
 * @see app/Http/Controllers/UserController.php:53
 * @route '/admin-users/{user}/deactivate'
 */
deactivate.post = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deactivate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserController::deactivate
 * @see app/Http/Controllers/UserController.php:53
 * @route '/admin-users/{user}/deactivate'
 */
    const deactivateForm = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deactivate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserController::deactivate
 * @see app/Http/Controllers/UserController.php:53
 * @route '/admin-users/{user}/deactivate'
 */
        deactivateForm.post = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deactivate.url(args, options),
            method: 'post',
        })
    
    deactivate.form = deactivateForm
/**
* @see \App\Http\Controllers\UserController::reactivate
 * @see app/Http/Controllers/UserController.php:58
 * @route '/admin-users/{user}/reactivate'
 */
export const reactivate = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reactivate.url(args, options),
    method: 'post',
})

reactivate.definition = {
    methods: ["post"],
    url: '/admin-users/{user}/reactivate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::reactivate
 * @see app/Http/Controllers/UserController.php:58
 * @route '/admin-users/{user}/reactivate'
 */
reactivate.url = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'userID' in args) {
            args = { user: args.userID }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.userID
                : args.user,
                }

    return reactivate.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::reactivate
 * @see app/Http/Controllers/UserController.php:58
 * @route '/admin-users/{user}/reactivate'
 */
reactivate.post = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reactivate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserController::reactivate
 * @see app/Http/Controllers/UserController.php:58
 * @route '/admin-users/{user}/reactivate'
 */
    const reactivateForm = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reactivate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserController::reactivate
 * @see app/Http/Controllers/UserController.php:58
 * @route '/admin-users/{user}/reactivate'
 */
        reactivateForm.post = (args: { user: number | { userID: number } } | [user: number | { userID: number } ] | number | { userID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reactivate.url(args, options),
            method: 'post',
        })
    
    reactivate.form = reactivateForm
const adminUsers = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
deactivate: Object.assign(deactivate, deactivate),
reactivate: Object.assign(reactivate, reactivate),
}

export default adminUsers