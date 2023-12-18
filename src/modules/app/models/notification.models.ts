export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export enum NotificationTypesEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export interface INotification {
  id: number;
  type: NotificationType;
  message: string;
  active: boolean;
}

export interface INotificationState {
  notifications: INotification[];
}

export interface INotificationAction {
  type: string;
  payload: INotification;
}

export interface INotificationStore {
  state: INotificationState;
  notify: (message: string, type?: NotificationType) => number;
  error: (status: number, message?: string) => number;
}

export enum NotificationActionTypes {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  DELETE_NOTIFICATION = 'DELETE_NOTIFICATION',
  INACTIVE_NOTIFICATION = 'INACTIVE_NOTIFICATION',
}

export class NotificationState {
  public notifications: INotification[];

  constructor() {
    this.notifications = [];
  }
}
