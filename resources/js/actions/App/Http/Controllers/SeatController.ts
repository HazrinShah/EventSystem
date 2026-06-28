import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SeatController::store
 * @see app/Http/Controllers/SeatController.php:152
 * @route '/api/seats'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/seats',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SeatController::store
 * @see app/Http/Controllers/SeatController.php:152
 * @route '/api/seats'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::store
 * @see app/Http/Controllers/SeatController.php:152
 * @route '/api/seats'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SeatController::store
 * @see app/Http/Controllers/SeatController.php:152
 * @route '/api/seats'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SeatController::store
 * @see app/Http/Controllers/SeatController.php:152
 * @route '/api/seats'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SeatController::destroy
 * @see app/Http/Controllers/SeatController.php:198
 * @route '/api/seats/{seat}'
 */
export const destroy = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/seats/{seat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SeatController::destroy
 * @see app/Http/Controllers/SeatController.php:198
 * @route '/api/seats/{seat}'
 */
destroy.url = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { seat: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'seatID' in args) {
            args = { seat: args.seatID }
        }
    
    if (Array.isArray(args)) {
        args = {
                    seat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        seat: typeof args.seat === 'object'
                ? args.seat.seatID
                : args.seat,
                }

    return destroy.definition.url
            .replace('{seat}', parsedArgs.seat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::destroy
 * @see app/Http/Controllers/SeatController.php:198
 * @route '/api/seats/{seat}'
 */
destroy.delete = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SeatController::destroy
 * @see app/Http/Controllers/SeatController.php:198
 * @route '/api/seats/{seat}'
 */
    const destroyForm = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SeatController::destroy
 * @see app/Http/Controllers/SeatController.php:198
 * @route '/api/seats/{seat}'
 */
        destroyForm.delete = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\SeatController::destroyAll
 * @see app/Http/Controllers/SeatController.php:212
 * @route '/api/events/{event}/seats'
 */
export const destroyAll = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAll.url(args, options),
    method: 'delete',
})

destroyAll.definition = {
    methods: ["delete"],
    url: '/api/events/{event}/seats',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SeatController::destroyAll
 * @see app/Http/Controllers/SeatController.php:212
 * @route '/api/events/{event}/seats'
 */
destroyAll.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return destroyAll.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::destroyAll
 * @see app/Http/Controllers/SeatController.php:212
 * @route '/api/events/{event}/seats'
 */
destroyAll.delete = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAll.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SeatController::destroyAll
 * @see app/Http/Controllers/SeatController.php:212
 * @route '/api/events/{event}/seats'
 */
    const destroyAllForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyAll.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SeatController::destroyAll
 * @see app/Http/Controllers/SeatController.php:212
 * @route '/api/events/{event}/seats'
 */
        destroyAllForm.delete = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyAll.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyAll.form = destroyAllForm
/**
* @see \App\Http\Controllers\SeatController::selectSeat
 * @see app/Http/Controllers/SeatController.php:225
 * @route '/api/seats/{seat}/select'
 */
export const selectSeat = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selectSeat.url(args, options),
    method: 'post',
})

selectSeat.definition = {
    methods: ["post"],
    url: '/api/seats/{seat}/select',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SeatController::selectSeat
 * @see app/Http/Controllers/SeatController.php:225
 * @route '/api/seats/{seat}/select'
 */
selectSeat.url = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { seat: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'seatID' in args) {
            args = { seat: args.seatID }
        }
    
    if (Array.isArray(args)) {
        args = {
                    seat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        seat: typeof args.seat === 'object'
                ? args.seat.seatID
                : args.seat,
                }

    return selectSeat.definition.url
            .replace('{seat}', parsedArgs.seat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::selectSeat
 * @see app/Http/Controllers/SeatController.php:225
 * @route '/api/seats/{seat}/select'
 */
selectSeat.post = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selectSeat.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SeatController::selectSeat
 * @see app/Http/Controllers/SeatController.php:225
 * @route '/api/seats/{seat}/select'
 */
    const selectSeatForm = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: selectSeat.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SeatController::selectSeat
 * @see app/Http/Controllers/SeatController.php:225
 * @route '/api/seats/{seat}/select'
 */
        selectSeatForm.post = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: selectSeat.url(args, options),
            method: 'post',
        })
    
    selectSeat.form = selectSeatForm
/**
* @see \App\Http\Controllers\SeatController::releaseSeat
 * @see app/Http/Controllers/SeatController.php:280
 * @route '/api/seats/{seat}/release'
 */
export const releaseSeat = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: releaseSeat.url(args, options),
    method: 'post',
})

releaseSeat.definition = {
    methods: ["post"],
    url: '/api/seats/{seat}/release',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SeatController::releaseSeat
 * @see app/Http/Controllers/SeatController.php:280
 * @route '/api/seats/{seat}/release'
 */
releaseSeat.url = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { seat: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'seatID' in args) {
            args = { seat: args.seatID }
        }
    
    if (Array.isArray(args)) {
        args = {
                    seat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        seat: typeof args.seat === 'object'
                ? args.seat.seatID
                : args.seat,
                }

    return releaseSeat.definition.url
            .replace('{seat}', parsedArgs.seat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::releaseSeat
 * @see app/Http/Controllers/SeatController.php:280
 * @route '/api/seats/{seat}/release'
 */
releaseSeat.post = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: releaseSeat.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SeatController::releaseSeat
 * @see app/Http/Controllers/SeatController.php:280
 * @route '/api/seats/{seat}/release'
 */
    const releaseSeatForm = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: releaseSeat.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SeatController::releaseSeat
 * @see app/Http/Controllers/SeatController.php:280
 * @route '/api/seats/{seat}/release'
 */
        releaseSeatForm.post = (args: { seat: number | { seatID: number } } | [seat: number | { seatID: number } ] | number | { seatID: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: releaseSeat.url(args, options),
            method: 'post',
        })
    
    releaseSeat.form = releaseSeatForm
/**
* @see \App\Http\Controllers\SeatController::statusPoll
 * @see app/Http/Controllers/SeatController.php:305
 * @route '/api/events/{event}/seat-status'
 */
export const statusPoll = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statusPoll.url(args, options),
    method: 'get',
})

statusPoll.definition = {
    methods: ["get","head"],
    url: '/api/events/{event}/seat-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeatController::statusPoll
 * @see app/Http/Controllers/SeatController.php:305
 * @route '/api/events/{event}/seat-status'
 */
statusPoll.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return statusPoll.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::statusPoll
 * @see app/Http/Controllers/SeatController.php:305
 * @route '/api/events/{event}/seat-status'
 */
statusPoll.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statusPoll.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::statusPoll
 * @see app/Http/Controllers/SeatController.php:305
 * @route '/api/events/{event}/seat-status'
 */
statusPoll.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statusPoll.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::statusPoll
 * @see app/Http/Controllers/SeatController.php:305
 * @route '/api/events/{event}/seat-status'
 */
    const statusPollForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: statusPoll.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::statusPoll
 * @see app/Http/Controllers/SeatController.php:305
 * @route '/api/events/{event}/seat-status'
 */
        statusPollForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statusPoll.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::statusPoll
 * @see app/Http/Controllers/SeatController.php:305
 * @route '/api/events/{event}/seat-status'
 */
        statusPollForm.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statusPoll.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    statusPoll.form = statusPollForm
/**
* @see \App\Http\Controllers\SeatController::adminStatusPoll
 * @see app/Http/Controllers/SeatController.php:323
 * @route '/api/events/{event}/seat-status-admin'
 */
export const adminStatusPoll = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminStatusPoll.url(args, options),
    method: 'get',
})

adminStatusPoll.definition = {
    methods: ["get","head"],
    url: '/api/events/{event}/seat-status-admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeatController::adminStatusPoll
 * @see app/Http/Controllers/SeatController.php:323
 * @route '/api/events/{event}/seat-status-admin'
 */
adminStatusPoll.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return adminStatusPoll.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::adminStatusPoll
 * @see app/Http/Controllers/SeatController.php:323
 * @route '/api/events/{event}/seat-status-admin'
 */
adminStatusPoll.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminStatusPoll.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::adminStatusPoll
 * @see app/Http/Controllers/SeatController.php:323
 * @route '/api/events/{event}/seat-status-admin'
 */
adminStatusPoll.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminStatusPoll.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::adminStatusPoll
 * @see app/Http/Controllers/SeatController.php:323
 * @route '/api/events/{event}/seat-status-admin'
 */
    const adminStatusPollForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminStatusPoll.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::adminStatusPoll
 * @see app/Http/Controllers/SeatController.php:323
 * @route '/api/events/{event}/seat-status-admin'
 */
        adminStatusPollForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminStatusPoll.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::adminStatusPoll
 * @see app/Http/Controllers/SeatController.php:323
 * @route '/api/events/{event}/seat-status-admin'
 */
        adminStatusPollForm.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminStatusPoll.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminStatusPoll.form = adminStatusPollForm
/**
* @see \App\Http\Controllers\SeatController::adminIndex
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
export const adminIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

adminIndex.definition = {
    methods: ["get","head"],
    url: '/seats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeatController::adminIndex
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
adminIndex.url = (options?: RouteQueryOptions) => {
    return adminIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::adminIndex
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
adminIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::adminIndex
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
adminIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::adminIndex
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
    const adminIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::adminIndex
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
        adminIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::adminIndex
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
        adminIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminIndex.form = adminIndexForm
/**
* @see \App\Http\Controllers\SeatController::index
 * @see app/Http/Controllers/SeatController.php:53
 * @route '/events/{event}/seats'
 */
export const index = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/events/{event}/seats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeatController::index
 * @see app/Http/Controllers/SeatController.php:53
 * @route '/events/{event}/seats'
 */
index.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::index
 * @see app/Http/Controllers/SeatController.php:53
 * @route '/events/{event}/seats'
 */
index.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::index
 * @see app/Http/Controllers/SeatController.php:53
 * @route '/events/{event}/seats'
 */
index.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::index
 * @see app/Http/Controllers/SeatController.php:53
 * @route '/events/{event}/seats'
 */
    const indexForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::index
 * @see app/Http/Controllers/SeatController.php:53
 * @route '/events/{event}/seats'
 */
        indexForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::index
 * @see app/Http/Controllers/SeatController.php:53
 * @route '/events/{event}/seats'
 */
        indexForm.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\SeatController::userSeatSelect
 * @see app/Http/Controllers/SeatController.php:113
 * @route '/events/{event}/select-seat'
 */
export const userSeatSelect = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userSeatSelect.url(args, options),
    method: 'get',
})

userSeatSelect.definition = {
    methods: ["get","head"],
    url: '/events/{event}/select-seat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeatController::userSeatSelect
 * @see app/Http/Controllers/SeatController.php:113
 * @route '/events/{event}/select-seat'
 */
userSeatSelect.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return userSeatSelect.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::userSeatSelect
 * @see app/Http/Controllers/SeatController.php:113
 * @route '/events/{event}/select-seat'
 */
userSeatSelect.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userSeatSelect.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::userSeatSelect
 * @see app/Http/Controllers/SeatController.php:113
 * @route '/events/{event}/select-seat'
 */
userSeatSelect.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userSeatSelect.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::userSeatSelect
 * @see app/Http/Controllers/SeatController.php:113
 * @route '/events/{event}/select-seat'
 */
    const userSeatSelectForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userSeatSelect.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::userSeatSelect
 * @see app/Http/Controllers/SeatController.php:113
 * @route '/events/{event}/select-seat'
 */
        userSeatSelectForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userSeatSelect.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::userSeatSelect
 * @see app/Http/Controllers/SeatController.php:113
 * @route '/events/{event}/select-seat'
 */
        userSeatSelectForm.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userSeatSelect.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userSeatSelect.form = userSeatSelectForm
/**
* @see \App\Http\Controllers\SeatController::userSeatView
 * @see app/Http/Controllers/SeatController.php:73
 * @route '/events/{event}/seat-view'
 */
export const userSeatView = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userSeatView.url(args, options),
    method: 'get',
})

userSeatView.definition = {
    methods: ["get","head"],
    url: '/events/{event}/seat-view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeatController::userSeatView
 * @see app/Http/Controllers/SeatController.php:73
 * @route '/events/{event}/seat-view'
 */
userSeatView.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return userSeatView.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::userSeatView
 * @see app/Http/Controllers/SeatController.php:73
 * @route '/events/{event}/seat-view'
 */
userSeatView.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userSeatView.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::userSeatView
 * @see app/Http/Controllers/SeatController.php:73
 * @route '/events/{event}/seat-view'
 */
userSeatView.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userSeatView.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::userSeatView
 * @see app/Http/Controllers/SeatController.php:73
 * @route '/events/{event}/seat-view'
 */
    const userSeatViewForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userSeatView.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::userSeatView
 * @see app/Http/Controllers/SeatController.php:73
 * @route '/events/{event}/seat-view'
 */
        userSeatViewForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userSeatView.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::userSeatView
 * @see app/Http/Controllers/SeatController.php:73
 * @route '/events/{event}/seat-view'
 */
        userSeatViewForm.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userSeatView.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userSeatView.form = userSeatViewForm
const SeatController = { store, destroy, destroyAll, selectSeat, releaseSeat, statusPoll, adminStatusPoll, adminIndex, index, userSeatSelect, userSeatView }

export default SeatController