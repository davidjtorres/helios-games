import { EventEmitter } from "events";
import { HeliosEvent } from "../events/base/HeliosEvent";

class EventDispatcher extends EventEmitter {
	dispatchEvent(event: HeliosEvent): void {
		const eventName = event.getEventName();
		super.emit(eventName);
	}
}

export default EventDispatcher;
