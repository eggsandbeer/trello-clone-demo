export enum LaneIds {
  backlog = 'backlog',
  todo = 'todo',
  onGoing = 'onGoing',
  teamReview = 'teamReview'
}

export type Lanes = {
  columns: Lane[];
};

export type Lane = {
  id: LaneIds;
  name: string;
  cards: Card[];
};

export type Label = {
  // should add possible colours from tailwind color enums.
  color: string;
  name: string;
  id: number;
};

export type Card = {
  id: string;
  name: string;
  labels: Label[];
  avatars: {
    id: string;
    img: string;
  }[];
  // consider adding position/index instead of just relying on map/render index.
};

// Add info to card doing search so we know where card exists in the lanes and it's index in the lane.
export type NormalizeCard = {
  id: string;
  card: Card;
  laneIndex: number;
  laneId: LaneIds;
};
