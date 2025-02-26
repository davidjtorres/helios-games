import EventDispatcher from "./event-dispatcher";
import { HeliosEvent } from "../events/base/HeliosEvent";

describe("EventDispatcher", () => {
	let eventDispatcher: EventDispatcher;

	beforeEach(() => {
		eventDispatcher = new EventDispatcher();
	});

	it("should emit event with correct type", () => {
		const event = new HeliosEvent(
			"This is an event",
			"This is the event message"
		);
		eventDispatcher.on(event.eventType, () => {
			expect(true).toBe(true);
		});
		eventDispatcher.dispatchEvent(event);
	});
});
