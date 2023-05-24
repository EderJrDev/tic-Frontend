import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function addNotification(notificationType, notificationTitle, notificationMessage, notificationPosition, notificationContent) {
    if (notificationContent) {
        notificationContent = (
            <div className="d-flex align-items-center bg-gray-900 rounded p-2 text-white w-100">
                <img src="../assets/img/user/user-12.jpg" width="52" alt="" className="rounded" />
                <div className="flex-1 ps-2">
                    <h6 className="mb-1">Christopher Struth</h6>
                    <p className="mb-0">Bank Transfer</p>
                </div>
            </div>
        );
    }
    Store.addNotification({
        title: notificationTitle,
        message: notificationMessage,
        type: notificationType,
        insert: "top",
        container: notificationPosition,
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 2000 },
        dismissable: { click: true },
        content: notificationContent
    });
}

export { addNotification }