import SeatController from './SeatController'
import SeatAssignmentController from './SeatAssignmentController'
import RsvpController from './RsvpController'
import DashboardController from './DashboardController'
import EventController from './EventController'
import UserController from './UserController'
import AdminProposalController from './AdminProposalController'
import EventProposalController from './EventProposalController'
import OrganizerController from './OrganizerController'
import Settings from './Settings'
const Controllers = {
    SeatController: Object.assign(SeatController, SeatController),
SeatAssignmentController: Object.assign(SeatAssignmentController, SeatAssignmentController),
RsvpController: Object.assign(RsvpController, RsvpController),
DashboardController: Object.assign(DashboardController, DashboardController),
EventController: Object.assign(EventController, EventController),
UserController: Object.assign(UserController, UserController),
AdminProposalController: Object.assign(AdminProposalController, AdminProposalController),
EventProposalController: Object.assign(EventProposalController, EventProposalController),
OrganizerController: Object.assign(OrganizerController, OrganizerController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers