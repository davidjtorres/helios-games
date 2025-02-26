import { EventEmitter } from "events";
import { HeliosEvent } from "../events/base/HeliosEvent";

class EventDispatcher extends EventEmitter {
	dispatchEvent(event: HeliosEvent): void {
		try {
			const eventName = event.getEventName();
			super.emit(event.eventType);
		} catch (error) {}
	}
}

export default EventDispatcher;
