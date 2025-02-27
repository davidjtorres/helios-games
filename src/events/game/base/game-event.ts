import { BaseEvent } from "../../base/BaseEvent";
import { GameEventNameEnum } from "../../../common/enums";

export class GameEvent extends BaseEvent {
	static readonly EVENT_TYPE: string = "GameEvent";
	readonly eventType: string = "GameEvent";

	constructor(eventType: GameEventNameEnum) {
		super(eventType);
	}
}
