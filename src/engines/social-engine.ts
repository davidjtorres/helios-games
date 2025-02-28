import EventDispatcher from "../event-dispatcher/event-dispatcher";
import { FriendRequest } from "../events/social/friend-request";
import { FriendRequestAccepted } from "../events/social/friend-request-accepted";

class SocialEngine {
	constructor(private eventDispatcher: EventDispatcher) {
		this.eventDispatcher = eventDispatcher;
	}

	sendFriendRequest(requesterId: string, targetId: string) {
		const event = new FriendRequest(
			this.eventDispatcher,
			requesterId,
			targetId
		);
		this.eventDispatcher.dispatchEvent(event.eventName, event.toJSON());
	}

	acceptFriendRequest(accepterId: string, requesterId: string) {
		const event = new FriendRequestAccepted(
			this.eventDispatcher,
			accepterId,
			requesterId
		);
		this.eventDispatcher.dispatchEvent(event.eventName, event.toJSON());
	}
}

export default SocialEngine;
