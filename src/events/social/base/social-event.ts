
import { BaseEvent } from "../../base/base-event";
import { EventTypeEnum, SocialEventNameEnum } from "../../../common/enums";

interface SocialEventPayload {
	playerId: string;
	gameId: string;
	targetPlayerId?: string;


}

export class SocialEvent extends BaseEvent {
	static readonly EVENT_TYPE: string = EventTypeEnum.Social;
	readonly eventType: string = EventTypeEnum.Social;
	readonly eventPayload: SocialEventPayload;

	constructor(eventName: SocialEventNameEnum, eventPayload: SocialEventPayload) {
		super(SocialEvent.EVENT_TYPE, eventName);
		this.eventPayload = eventPayload;
	}
}
