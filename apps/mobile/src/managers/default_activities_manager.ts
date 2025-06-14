import { ApiManager } from "~/utils/api/api_manager";

export default class DefaultActivitiesManager {
  public static async fetch(): Promise<any[]> {
    const response = await ApiManager.getInstance().get("/activities/default");

    console.log("Response status:", response.data);
    const payload = response.data;
    console.log("Payload:", payload.activities);

    const categories = payload.categories || [];

    console.log("Categories:", categories);
    return categories;
  }
}