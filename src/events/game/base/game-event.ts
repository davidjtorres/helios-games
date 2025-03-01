import { BaseEvent } from "../../base/base-event";
import { EventTypeEnum, GameEventNameEnum } from "../../../common/enums";

interface GameEventPayload {
	playerId: string;
	level?: number;
	itemId?: string;
	questId?: string;
	achievementId?: string;
}

export class GameEvent extends BaseEvent {
	static readonly EVENT_TYPE: string = EventTypeEnum.Game;
	readonly eventType: string = EventTypeEnum.Game;
	readonly eventPayload: GameEventPayload;

	constructor(eventName: GameEventNameEnum, eventPayload: GameEventPayload) {
		super(GameEvent.EVENT_TYPE, eventName);
		this.eventPayload = eventPayload;
	}
}
