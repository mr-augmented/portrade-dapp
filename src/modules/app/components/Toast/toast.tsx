import { NotificationType } from '../../models/notification.models';

interface IToastProps {
  message: string;
  type?: NotificationType;
  active: boolean;
}

export default function Toast({ message, type = 'success', active }: IToastProps) {
  switch (type) {
    case 'success':
      return (
        <div className={`alert alert-success animate-fade-up animate-ease-in-out animate-normal`}>
          <span>{message}</span>
        </div>
      );
    case 'error':
      return (
        <div className={`alert alert-error animate-fade-up animate-ease-in-out animate-normal`}>
          <span>{message}</span>
        </div>
      );
    case 'info':
      return (
        <div className={`alert alert-info animate-fade-up animate-ease-in-out animate-normal`}>
          <span>{message}</span>
        </div>
      );
    case 'warning':
      return (
        <div className={`alert alert-warning animate-fade-up animate-ease-in-out animate-normal`}>
          <span>{message}</span>
        </div>
      );
    default:
      return (
        <div className={`alert animate-fade-up animate-ease-in-out animate-normal`}>
          <span>{message}</span>
        </div>
      );
  }
}
