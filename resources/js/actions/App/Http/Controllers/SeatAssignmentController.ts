import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SeatAssignmentController::store
 * @see app/Http/Controllers/SeatAssignmentController.php:14
 * @route '/api/confirm-seat'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/confirm-seat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SeatAssignmentController::store
 * @see app/Http/Controllers/SeatAssignmentController.php:14
 * @route '/api/confirm-seat'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SeatAssignmentController::store
 * @see app/Http/Controllers/SeatAssignmentController.php:14
 * @route '/api/confirm-seat'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SeatAssignmentController::store
 * @see app/Http/Controllers/SeatAssignmentController.php:14
 * @route '/api/confirm-seat'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SeatAssignmentController::store
 * @see app/Http/Controllers/SeatAssignmentController.php:14
 * @route '/api/confirm-seat'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const SeatAssignmentController = { store }

export default SeatAssignmentController