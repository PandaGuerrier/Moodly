import { ApiManager } from '~/utils/api/api_manager'
import { DefaultActivity } from '~/models/activity'

export default class DefaultActivitiesManager {
  public static async fetch(): Promise<any[]> {
    const response = await ApiManager.getInstance().get('/activities/default');

    console.log('Response status:', response.data);
    const payload = response.data;
    console.log('Payload:', payload.activities);

    const activities = payload.activities.map((activity: any) => {
      return {
        id: activity.id,
        name: activity.name,
        description: activity.description,
        isActive: activity.isActive,
        type: activity.type,
        data: activity.data || {},
      };
    }) as DefaultActivity[];

    return activities;
  }
}