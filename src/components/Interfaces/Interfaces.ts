export interface ItemsObject {
  items: {
    name: string;
    location: number[];
  }[];
}

export interface ScoreObject {
  position: string;
  username: string;
  time: number;
}

export interface ScoreCollection {
  level: string;
  scores: ScoreObject[];
}
