export interface ItemsObject {
  items: {
    name: string;
    location: number[];
  }[];
}

export interface ScoresObject {
  highScores: {
    position: string;
    username: string;
    time: number;
  }[];
}
