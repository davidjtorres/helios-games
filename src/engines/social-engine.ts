import EventDispatcher from "../event-dispatcher/event-dispatcher";
import { SocialEvent } from "../events/social/base/social-event";
import { SocialEventNameEnum } from "../common/enums";

class SocialEngine {
	constructor(private eventDispatcher: EventDispatcher) {
		this.eventDispatcher = eventDispatcher;
	}

	sendFriendRequest(requesterId: string, targetId: string, gameId: string) {
		const event = new SocialEvent(
			SocialEventNameEnum.FriendRequest,
			{
				playerId: requesterId,
				targetPlayerId: targetId,
				gameId: gameId
			}
		);
		this.eventDispatcher.dispatchEvent(event.eventType, event);
	}

	acceptFriendRequest(accepterId: string, requesterId: string, gameId: string) {
		const event = new SocialEvent(
			SocialEventNameEnum.FriendRequestAccepted,
			{
				playerId: accepterId,
				targetPlayerId: requesterId,
				gameId: gameId
			}
		);
		this.eventDispatcher.dispatchEvent(event.eventType, event);
	}

	followUser(followerId: string, followingId: string, gameId: string) {
		const event = new SocialEvent(
			SocialEventNameEnum.FollowUser,
			{
				playerId: followerId,
				targetPlayerId: followingId,
				gameId: gameId
			}
		);
		this.eventDispatcher.dispatchEvent(event.eventType, event);
	}
}

export default SocialEngine;
