import { GameEvent } from "./base/game-event";
import { GameEventNameEnum } from "../../common/enums";

export class PlayerVsPlayerEvent extends GameEvent {
	constructor(
		private readonly originPlayerId: string,
		private readonly targetPlayerId: string,
		private readonly action: string
	) {
		super(GameEventNameEnum.PlayerVsPlayer);
	}

	public getOriginPlayerId(): string {
		return this.originPlayerId;
	}

	public getTargetPlayerId(): string {
		return this.targetPlayerId;
	}

	public getAction(): string {
		return this.action;
	}
}
