import EventDispatcher from "../../event-dispatcher/event-dispatcher";
import SocialEvent from "./base/social-event";

export class NewFollower extends SocialEvent {
    static readonly eventName: string = "follower.new";
    readonly eventName: string = NewFollower.eventName;
  
    constructor(
      eventDispatcher: EventDispatcher,
      public readonly followerId: string,
      public readonly targetId: string
    ) {
      super(eventDispatcher);
    }
  }