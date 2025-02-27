import { EventEmitter } from "events";

/**
 * @description EventDispatcher is an emiiter that other classes use to dispatch and listen to events.
 */
class EventDispatcher extends EventEmitter {
	dispatchEvent(topic: string, data: { [key: string]: any }): void {
		try {
			super.emit(topic, data);
		} catch (error) {}
	}
}

export default EventDispatcher;
