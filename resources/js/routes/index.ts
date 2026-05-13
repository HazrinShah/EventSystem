import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
 * @see routes/web.php:20
 * @route '/redirect'
 */
export const redirect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})

redirect.definition = {
    methods: ["get","head"],
    url: '/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:20
 * @route '/redirect'
 */
redirect.url = (options?: RouteQueryOptions) => {
    return redirect.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:20
 * @route '/redirect'
 */
redirect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:20
 * @route '/redirect'
 */
redirect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirect.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:20
 * @route '/redirect'
 */
    const redirectForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirect.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:20
 * @route '/redirect'
 */
        redirectForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:20
 * @route '/redirect'
 */
        redirectForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirect.form = redirectForm
/**
 * @see routes/web.php:30
 * @route '/sadashboard'
 */
export const sadashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sadashboard.url(options),
    method: 'get',
})

sadashboard.definition = {
    methods: ["get","head"],
    url: '/sadashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:30
 * @route '/sadashboard'
 */
sadashboard.url = (options?: RouteQueryOptions) => {
    return sadashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:30
 * @route '/sadashboard'
 */
sadashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sadashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:30
 * @route '/sadashboard'
 */
sadashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sadashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:30
 * @route '/sadashboard'
 */
    const sadashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sadashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:30
 * @route '/sadashboard'
 */
        sadashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sadashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:30
 * @route '/sadashboard'
 */
        sadashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sadashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sadashboard.form = sadashboardForm
/**
* @see \App\Http\Controllers\UserController::adminUsers
 * @see app/Http/Controllers/UserController.php:12
 * @route '/admin-users'
 */
export const adminUsers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminUsers.url(options),
    method: 'get',
})

adminUsers.definition = {
    methods: ["get","head"],
    url: '/admin-users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::adminUsers
 * @see app/Http/Controllers/UserController.php:12
 * @route '/admin-users'
 */
adminUsers.url = (options?: RouteQueryOptions) => {
    return adminUsers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::adminUsers
 * @see app/Http/Controllers/UserController.php:12
 * @route '/admin-users'
 */
adminUsers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminUsers.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::adminUsers
 * @see app/Http/Controllers/UserController.php:12
 * @route '/admin-users'
 */
adminUsers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminUsers.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::adminUsers
 * @see app/Http/Controllers/UserController.php:12
 * @route '/admin-users'
 */
    const adminUsersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminUsers.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::adminUsers
 * @see app/Http/Controllers/UserController.php:12
 * @route '/admin-users'
 */
        adminUsersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminUsers.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::adminUsers
 * @see app/Http/Controllers/UserController.php:12
 * @route '/admin-users'
 */
        adminUsersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminUsers.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminUsers.form = adminUsersForm
/**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
export const events = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})

events.definition = {
    methods: ["get","head"],
    url: '/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
events.url = (options?: RouteQueryOptions) => {
    return events.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
events.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
events.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: events.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
    const eventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: events.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
        eventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: events.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:10
 * @route '/events'
 */
        eventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: events.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    events.form = eventsForm
/**
* @see \App\Http\Controllers\RsvpController::rsvp
 * @see app/Http/Controllers/RsvpController.php:0
 * @route '/rsvp'
 */
export const rsvp = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rsvp.url(options),
    method: 'get',
})

rsvp.definition = {
    methods: ["get","head"],
    url: '/rsvp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RsvpController::rsvp
 * @see app/Http/Controllers/RsvpController.php:0
 * @route '/rsvp'
 */
rsvp.url = (options?: RouteQueryOptions) => {
    return rsvp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RsvpController::rsvp
 * @see app/Http/Controllers/RsvpController.php:0
 * @route '/rsvp'
 */
rsvp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rsvp.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RsvpController::rsvp
 * @see app/Http/Controllers/RsvpController.php:0
 * @route '/rsvp'
 */
rsvp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rsvp.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RsvpController::rsvp
 * @see app/Http/Controllers/RsvpController.php:0
 * @route '/rsvp'
 */
    const rsvpForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rsvp.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RsvpController::rsvp
 * @see app/Http/Controllers/RsvpController.php:0
 * @route '/rsvp'
 */
        rsvpForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rsvp.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RsvpController::rsvp
 * @see app/Http/Controllers/RsvpController.php:0
 * @route '/rsvp'
 */
        rsvpForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rsvp.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    rsvp.form = rsvpForm
/**
* @see \App\Http\Controllers\SeatController::seatManagement
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
export const seatManagement = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seatManagement.url(options),
    method: 'get',
})

seatManagement.definition = {
    methods: ["get","head"],
    url: '/seats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeatController::seatManagement
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
seatManagement.url = (options?: RouteQueryOptions) => {
    return seatManagement.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::seatManagement
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
seatManagement.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seatManagement.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::seatManagement
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
seatManagement.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: seatManagement.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::seatManagement
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
    const seatManagementForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: seatManagement.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::seatManagement
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
        seatManagementForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seatManagement.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::seatManagement
 * @see app/Http/Controllers/SeatController.php:14
 * @route '/seats'
 */
        seatManagementForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seatManagement.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    seatManagement.form = seatManagementForm
/**
* @see \App\Http\Controllers\SeatController::seats
 * @see app/Http/Controllers/SeatController.php:52
 * @route '/events/{event}/seats'
 */
export const seats = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seats.url(args, options),
    method: 'get',
})

seats.definition = {
    methods: ["get","head"],
    url: '/events/{event}/seats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SeatController::seats
 * @see app/Http/Controllers/SeatController.php:52
 * @route '/events/{event}/seats'
 */
seats.url = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions) => {
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

    return seats.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatController::seats
 * @see app/Http/Controllers/SeatController.php:52
 * @route '/events/{event}/seats'
 */
seats.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seats.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SeatController::seats
 * @see app/Http/Controllers/SeatController.php:52
 * @route '/events/{event}/seats'
 */
seats.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: seats.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SeatController::seats
 * @see app/Http/Controllers/SeatController.php:52
 * @route '/events/{event}/seats'
 */
    const seatsForm = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: seats.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SeatController::seats
 * @see app/Http/Controllers/SeatController.php:52
 * @route '/events/{event}/seats'
 */
        seatsForm.get = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seats.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SeatController::seats
 * @see app/Http/Controllers/SeatController.php:52
 * @route '/events/{event}/seats'
 */
        seatsForm.head = (args: { event: number | { eventID: number } } | [event: number | { eventID: number } ] | number | { eventID: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seats.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    seats.form = seatsForm
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/add-events'
 */
export const addEvents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: addEvents.url(options),
    method: 'get',
})

addEvents.definition = {
    methods: ["get","head"],
    url: '/add-events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/add-events'
 */
addEvents.url = (options?: RouteQueryOptions) => {
    return addEvents.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/add-events'
 */
addEvents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: addEvents.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/add-events'
 */
addEvents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: addEvents.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/add-events'
 */
    const addEventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: addEvents.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/add-events'
 */
        addEventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: addEvents.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/add-events'
 */
        addEventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: addEvents.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    addEvents.form = addEventsForm
/**
* @see \App\Http\Controllers\EventController::uevents
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
export const uevents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uevents.url(options),
    method: 'get',
})

uevents.definition = {
    methods: ["get","head"],
    url: '/uevents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventController::uevents
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
uevents.url = (options?: RouteQueryOptions) => {
    return uevents.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::uevents
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
uevents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: uevents.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventController::uevents
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
uevents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: uevents.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EventController::uevents
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
    const ueventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: uevents.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EventController::uevents
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
        ueventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: uevents.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EventController::uevents
 * @see app/Http/Controllers/EventController.php:35
 * @route '/uevents'
 */
        ueventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: uevents.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    uevents.form = ueventsForm
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/udashboard'
 */
export const udashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: udashboard.url(options),
    method: 'get',
})

udashboard.definition = {
    methods: ["get","head"],
    url: '/udashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/udashboard'
 */
udashboard.url = (options?: RouteQueryOptions) => {
    return udashboard.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/udashboard'
 */
udashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: udashboard.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/udashboard'
 */
udashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: udashboard.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/udashboard'
 */
    const udashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: udashboard.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/udashboard'
 */
        udashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: udashboard.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/udashboard'
 */
        udashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: udashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    udashboard.form = udashboardForm