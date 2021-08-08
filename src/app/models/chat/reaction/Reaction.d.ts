export type Reaction = {
  value: string;
  users: ReactionUser[];
};

export type ReactionUser = {
  hash: string;
  icon: string;
  nickname: string;
};
