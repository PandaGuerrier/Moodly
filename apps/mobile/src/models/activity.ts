import Category from "~/models/category";

export default class Activity {
  id: number;
  defaultActivity: DefaultActivity;
  isFinished: boolean;
  isStarted: boolean;
  data: any;

  startedAt: Date | null;
  finishedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;

  constructor(activity: Partial<Activity>) {
    this.id = activity.id || 0;
    this.defaultActivity = activity.defaultActivity || ({} as DefaultActivity);
    this.isFinished = activity.isFinished || false;
    this.isStarted = activity.isStarted || false;
    this.data = activity.data || {};

    this.startedAt = activity.startedAt ? new Date(activity.startedAt) : null;
    this.finishedAt = activity.finishedAt
      ? new Date(activity.finishedAt)
      : null;

    this.createdAt = new Date(activity.createdAt || Date.now());
    this.updatedAt = new Date(activity.updatedAt || Date.now());
  }

  get isActive(): boolean {
    return this.defaultActivity.isActive;
  }

  get name(): string {
    return this.defaultActivity.name;
  }

  get description(): string {
    return this.defaultActivity.description;
  }

  get type(): "photo" | "calcul" | "dictee" | "audio" {
    return this.defaultActivity.type;
  }

  get dataContent(): any {
    return this.defaultActivity.data;
  }

  // other methods
}

export type DefaultActivity = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  type: "photo" | "calcul" | "dictee" | "audio";
  data: any;
  age: number;
  maxAge: number | null;
  difficulty: number; // 1 to 100
  category: Category;
};