/**
 * @description This is the base class for all notifications in the system
 */

class BaseNotification {
	payload: string;
	read: boolean;
	userId: string;
	deviceId: string;
	email: string;
	notificationType: string;
	priority: 1 | 2 | 3;
	createdAt: Date;
	updatedAt: Date;

	constructor(
		payload: string,
		userId: string,
		notificationType: string,
		priority: 1 | 2 | 3
	) {
		this.payload = payload;
		this.read = false;
		this.userId = userId;
		this.notificationType = notificationType;
		this.priority = priority;
		this.createdAt = new Date();
	}
}

export default BaseNotification;
