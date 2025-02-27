import { GameEvent } from "./base/game-event";
import { GameEventNameEnum } from "../../common/enums";

export class PlayerAcquireItemEvent extends GameEvent {
	constructor(
		private readonly playerId: string,
		private readonly itemId: string
	) {
		super(GameEventNameEnum.PlayerAcquireItem);
	}

	public getPlayerId(): string {
		return this.playerId;
	}

	public getItemId(): string {
		return this.itemId;
	}
}
