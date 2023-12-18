'use client';

import { createContext, useCallback, useContext, useReducer } from 'react';
import { INotificationStore, NotificationActionTypes, NotificationType, NotificationTypesEnum } from '../models/notification.models';
import { initialNotificaitonState, notificationReducer } from '../store/notification.store';
import { NOTIFICATION_CONFIGURATION } from '../constants/app';
import Toast from '../components/Toast/toast';
import { API_RESPONSE_MESSAGE } from '../constants/api';

const NotificationContext = createContext<INotificationStore | undefined>(undefined);

interface INotificationProviderProps {
  children: React.ReactNode;
}

export default function NotificationProvider({ children }: INotificationProviderProps) {
  const [state, dispatch] = useReducer(notificationReducer, initialNotificaitonState);

  const addNotification = (message: string, type: NotificationType = 'info') => {
    const id = state.notifications.length;
    dispatch({
      type: NotificationActionTypes.ADD_NOTIFICATION,
      payload: { id: id, type: type, message: message, active: true },
    });
    setTimeout(() => {
      closeNotification(id);
    }, NOTIFICATION_CONFIGURATION.duration);
    return id;
  };

  const errorNotification = (status: number, message?: string) => {
    if (message) {
      return addNotification(message, NotificationTypesEnum.ERROR);
    } else {
      return addNotification(API_RESPONSE_MESSAGE[status], NotificationTypesEnum.ERROR);
    }
  };

  const closeNotification = (id: number) => {
    dispatch({
      type: NotificationActionTypes.INACTIVE_NOTIFICATION,
      payload: { id: id, type: 'error', message: '', active: false },
    });
    setTimeout(() => {
      deleteNotification(id);
    }, 1000);
  };

  const deleteNotification = (id: number) => {
    dispatch({
      type: NotificationActionTypes.DELETE_NOTIFICATION,
      payload: { id: id, type: 'error', message: '', active: false },
    });
  };

  return (
    <NotificationContext.Provider value={{ state, notify: addNotification, error: errorNotification }}>
      <div className='toast z-50'>
        {state.notifications.map((notification) => (
          <Toast key={notification.id} message={notification.message} type={notification.type} active={notification.active} />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = (): INotificationStore => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('`useNotificationContext` must be used within a `NotificationProvider`');
  }
  return context;
};
