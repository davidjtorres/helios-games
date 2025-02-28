/**
 * @description This is the base class for all events in the system
 * @property {string} id - Unique identifier for the event
 * @property {number} timestamp - When the event occurred
 * @property {string} eventType - Type of event
 * @property {string} source - Where the event originated from
 * @property {Record<string, any>} metadata - Optional additional data
 */
export abstract class BaseEvent {
	protected readonly id: string; // Unique identifier for the event
	protected readonly timestamp: number; // When the event occurred
	protected readonly eventType: string; // Type of event
	protected readonly source: string; // Where the event originated from // Importance level of the event
	protected metadata?: Record<string, any>; // Optional additional data

	constructor(
		eventType: string,
		source?: string,
		metadata?: Record<string, any>
	) {
		this.id = this.generateEventId();
		this.timestamp = Date.now();
		this.eventType = eventType;
		this.source = source;
		this.metadata = metadata;
	}

	public getId(): string {
		return this.id;
	}

	public getTimestamp(): number {
		return this.timestamp;
	}

	public getEventType(): string {
		return this.eventType;
	}

	public getSource(): string {
		return this.source;
	}

	public getMetadata(): Record<string, any> | undefined {
		return this.metadata;
	}

	private generateEventId(): string {
		return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

	public toJSON(): Record<string, any> {
		return Object.getOwnPropertyNames(this).reduce((acc, prop) => {
			acc[prop] = this[prop];
			return acc;
		}, {});
	}

	serialize(): string {
		return JSON.stringify(this);
	}
}
