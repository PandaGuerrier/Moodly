import { DefaultActivity } from "~/models/activity";

export default class Category {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  color: string;
  activities: DefaultActivity[]; // Optional, can be defined more specifically if needed

  createdAt: Date;
  updatedAt: Date;

  constructor(category: Partial<Category>) {
    this.id = category.id || 0;
    this.name = category.name || '';
    this.description = category.description || null;
    this.icon = category.icon || null;
    this.color = category.color || 'red'; // Default color set to red
    this.activities = category.activities || [];

    this.createdAt = new Date(category.createdAt || Date.now());
    this.updatedAt = new Date(category.updatedAt || Date.now());
  }
}