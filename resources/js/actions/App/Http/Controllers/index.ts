import SeatController from './SeatController'
import SeatAssignmentController from './SeatAssignmentController'
import RsvpController from './RsvpController'
import UserController from './UserController'
import EventController from './EventController'
import Settings from './Settings'
const Controllers = {
    SeatController: Object.assign(SeatController, SeatController),
SeatAssignmentController: Object.assign(SeatAssignmentController, SeatAssignmentController),
RsvpController: Object.assign(RsvpController, RsvpController),
UserController: Object.assign(UserController, UserController),
EventController: Object.assign(EventController, EventController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers