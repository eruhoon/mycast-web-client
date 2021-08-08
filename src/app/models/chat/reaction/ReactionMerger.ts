import { ReactionResponse } from '../../socket/VegaChatSocketModel';
import { Reaction, ReactionUser } from './Reaction';

export class ReactionMerger {
  addReaction(
    reactions: Reaction[],
    reactionRes: ReactionResponse
  ): Reaction[] {
    const found = reactions.find((item) => item.value === reactionRes.reaction);
    if (!found) {
      return [...reactions, this.#createReaction(reactionRes)];
    } else {
      const userIdx = found.users.findIndex(
        (u) => u.hash == reactionRes.userHash
      );
      if (userIdx < 0) {
        found.users = [...found.users, this.#createReactionUser(reactionRes)];
      } else {
        const user = found.users[userIdx];
        found.users[userIdx] = this.#updateUser(user, reactionRes);
      }
      return [...reactions];
    }
  }

  #updateUser = (user: ReactionUser, res: ReactionResponse): ReactionUser => {
    return { hash: user.hash, icon: res.icon, nickname: res.nickname };
  };

  #createReaction = (response: ReactionResponse): Reaction => {
    return {
      value: response.reaction,
      users: [this.#createReactionUser(response)],
    };
  };

  #createReactionUser = (response: ReactionResponse): ReactionUser => {
    return {
      hash: response.userHash,
      icon: response.icon,
      nickname: response.nickname,
    };
  };
}
