/**
 * @description This is the base class for all notifications in the system
 */

import { EventTypeEnum, NotificationTypeEnum } from "../common/enums";

class BaseNotification {
	payload: string;
	read: boolean;
	userId: string;
	deviceId?: string;
	email?: string;
	notificationType: NotificationTypeEnum;
	notificationSource: EventTypeEnum;
	priority: 1 | 2 | 3;
	createdAt: Date;

	constructor(
		payload: string,
		userId: string,
		notificationType: NotificationTypeEnum,
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
