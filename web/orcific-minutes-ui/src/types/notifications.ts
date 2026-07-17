export type NotificationType = 'success' | 'error' | 'info';

export type Notification = {
    id: string;
    type: NotificationType;
    title: string;
    message?: string | undefined;
};
