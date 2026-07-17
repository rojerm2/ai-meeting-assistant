import type { Notification } from '../types/notifications';

interface NotificationToastProps {
    notifications: Notification[];
    onDismiss: (id: string) => void;
}

const typeStyles: Record<Notification['type'], string> = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-rose-600 text-white',
    info: 'bg-slate-900 text-white',
};

export default function NotificationToast({
    notifications,
    onDismiss,
}: NotificationToastProps) {
    return (
        <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`pointer-events-auto overflow-hidden rounded-3xl border border-white/10 shadow-xl ${typeStyles[notification.type]}`}
                >
                    <div className="flex items-start justify-between gap-4 p-4">
                        <div className="space-y-1">
                            <p className="text-sm font-semibold">{notification.title}</p>
                            {notification.message ? (
                                <p className="text-sm text-white/90">{notification.message}</p>
                            ) : null}
                        </div>
                        <button
                            type="button"
                            aria-label="Dismiss notification"
                            className="text-white/80 transition hover:text-white"
                            onClick={() => onDismiss(notification.id)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
