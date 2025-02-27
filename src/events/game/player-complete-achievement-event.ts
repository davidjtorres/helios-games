import { GameEvent, GameEventNameEnum } from "./base/game-event";

export class PlayerCompleteAchievementEvent extends GameEvent {
    constructor(private readonly playerId: string, private readonly achievementId: string) {
        super(GameEventNameEnum.PlayerCompleteAchievement);
    }

    public getPlayerId(): string {
        return this.playerId;
    }

    public getAchievementId(): string {
        return this.achievementId;
    }
} 