import { BaseEvent } from "../../base/base-event";
import { EventTypeEnum } from "../../../common/enums";

export class GameEvent extends BaseEvent {
	static readonly EVENT_TYPE: string = EventTypeEnum.Game;
	readonly eventType: string = EventTypeEnum.Game;
}
