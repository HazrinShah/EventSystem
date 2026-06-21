import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminProposalController::index
 * @see app/Http/Controllers/AdminProposalController.php:13
 * @route '/admin/proposals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/proposals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminProposalController::index
 * @see app/Http/Controllers/AdminProposalController.php:13
 * @route '/admin/proposals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminProposalController::index
 * @see app/Http/Controllers/AdminProposalController.php:13
 * @route '/admin/proposals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminProposalController::index
 * @see app/Http/Controllers/AdminProposalController.php:13
 * @route '/admin/proposals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminProposalController::index
 * @see app/Http/Controllers/AdminProposalController.php:13
 * @route '/admin/proposals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminProposalController::index
 * @see app/Http/Controllers/AdminProposalController.php:13
 * @route '/admin/proposals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminProposalController::index
 * @see app/Http/Controllers/AdminProposalController.php:13
 * @route '/admin/proposals'
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
* @see \App\Http\Controllers\AdminProposalController::approve
 * @see app/Http/Controllers/AdminProposalController.php:21
 * @route '/admin/proposals/{proposal}/approve'
 */
export const approve = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/proposals/{proposal}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminProposalController::approve
 * @see app/Http/Controllers/AdminProposalController.php:21
 * @route '/admin/proposals/{proposal}/approve'
 */
approve.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: args.proposal,
                }

    return approve.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminProposalController::approve
 * @see app/Http/Controllers/AdminProposalController.php:21
 * @route '/admin/proposals/{proposal}/approve'
 */
approve.post = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminProposalController::approve
 * @see app/Http/Controllers/AdminProposalController.php:21
 * @route '/admin/proposals/{proposal}/approve'
 */
    const approveForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminProposalController::approve
 * @see app/Http/Controllers/AdminProposalController.php:21
 * @route '/admin/proposals/{proposal}/approve'
 */
        approveForm.post = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\AdminProposalController::reject
 * @see app/Http/Controllers/AdminProposalController.php:53
 * @route '/admin/proposals/{proposal}/reject'
 */
export const reject = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/proposals/{proposal}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminProposalController::reject
 * @see app/Http/Controllers/AdminProposalController.php:53
 * @route '/admin/proposals/{proposal}/reject'
 */
reject.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: args.proposal,
                }

    return reject.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminProposalController::reject
 * @see app/Http/Controllers/AdminProposalController.php:53
 * @route '/admin/proposals/{proposal}/reject'
 */
reject.post = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminProposalController::reject
 * @see app/Http/Controllers/AdminProposalController.php:53
 * @route '/admin/proposals/{proposal}/reject'
 */
    const rejectForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminProposalController::reject
 * @see app/Http/Controllers/AdminProposalController.php:53
 * @route '/admin/proposals/{proposal}/reject'
 */
        rejectForm.post = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const proposals = {
    index: Object.assign(index, index),
approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
}

export default proposals