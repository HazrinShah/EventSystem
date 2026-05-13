import SeatController from './SeatController'
import SeatAssignmentController from './SeatAssignmentController'
import UserController from './UserController'
import EventController from './EventController'
import RsvpController from './RsvpController'
import Settings from './Settings'
const Controllers = {
    SeatController: Object.assign(SeatController, SeatController),
SeatAssignmentController: Object.assign(SeatAssignmentController, SeatAssignmentController),
UserController: Object.assign(UserController, UserController),
EventController: Object.assign(EventController, EventController),
RsvpController: Object.assign(RsvpController, RsvpController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers