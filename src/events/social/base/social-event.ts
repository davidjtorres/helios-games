
import { BaseEvent } from "../../base/base-event";
import { EventTypeEnum } from "../../../common/enums";
class SocialEvent extends BaseEvent {
	static readonly EVENT_TYPE: string = EventTypeEnum.Social;
	readonly eventType: string = EventTypeEnum.Social;
}

export default SocialEvent;
