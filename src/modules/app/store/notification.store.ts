import {
  INotificationAction,
  INotificationState,
  NotificationActionTypes,
} from '../models/notification.models';

export const initialNotificaitonState: INotificationState = {
  notifications: [],
};

export function notificationReducer(
  state: INotificationState = initialNotificaitonState,
  action: INotificationAction
) {
  const { type, payload } = action;
  switch (type) {
    case NotificationActionTypes.ADD_NOTIFICATION: {
      return {
        notifications: [...state.notifications, payload],
      };
    }
    case NotificationActionTypes.DELETE_NOTIFICATION: {
      const notifications = state.notifications?.filter((n) => n.id !== payload.id);
      return {
        notifications: [...notifications],
      };
    }
    case NotificationActionTypes.INACTIVE_NOTIFICATION: {
      const notifications = state.notifications?.map((n) => {
        if (n.id === payload.id) {
          return {
            ...n,
            active: false,
          };
        }
        return n;
      });
      return { notifications: [...notifications] };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}
