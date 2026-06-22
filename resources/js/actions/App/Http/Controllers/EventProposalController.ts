import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EventProposalController::index
 * @see app/Http/Controllers/EventProposalController.php:11
 * @route '/my-proposals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/my-proposals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventProposalController::index
 * @see app/Http/Controllers/EventProposalController.php:11
 * @route '/my-proposals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventProposalController::index
 * @see app/Http/Controllers/EventProposalController.php:11
 * @route '/my-proposals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventProposalController::index
 * @see app/Http/Controllers/EventProposalController.php:11
 * @route '/my-proposals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EventProposalController::index
 * @see app/Http/Controllers/EventProposalController.php:11
 * @route '/my-proposals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EventProposalController::index
 * @see app/Http/Controllers/EventProposalController.php:11
 * @route '/my-proposals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EventProposalController::index
 * @see app/Http/Controllers/EventProposalController.php:11
 * @route '/my-proposals'
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
* @see \App\Http\Controllers\EventProposalController::create
 * @see app/Http/Controllers/EventProposalController.php:19
 * @route '/my-proposals/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/my-proposals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventProposalController::create
 * @see app/Http/Controllers/EventProposalController.php:19
 * @route '/my-proposals/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventProposalController::create
 * @see app/Http/Controllers/EventProposalController.php:19
 * @route '/my-proposals/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventProposalController::create
 * @see app/Http/Controllers/EventProposalController.php:19
 * @route '/my-proposals/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EventProposalController::create
 * @see app/Http/Controllers/EventProposalController.php:19
 * @route '/my-proposals/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EventProposalController::create
 * @see app/Http/Controllers/EventProposalController.php:19
 * @route '/my-proposals/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EventProposalController::create
 * @see app/Http/Controllers/EventProposalController.php:19
 * @route '/my-proposals/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\EventProposalController::store
 * @see app/Http/Controllers/EventProposalController.php:23
 * @route '/my-proposals'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/my-proposals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EventProposalController::store
 * @see app/Http/Controllers/EventProposalController.php:23
 * @route '/my-proposals'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventProposalController::store
 * @see app/Http/Controllers/EventProposalController.php:23
 * @route '/my-proposals'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EventProposalController::store
 * @see app/Http/Controllers/EventProposalController.php:23
 * @route '/my-proposals'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EventProposalController::store
 * @see app/Http/Controllers/EventProposalController.php:23
 * @route '/my-proposals'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const EventProposalController = { index, create, store }

export default EventProposalController