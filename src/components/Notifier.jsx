import { observer } from "mobx-react";
import { onSnapshot } from "mobx-state-tree";
import { useSnackbar } from "notistack";
import { useContext, useRef } from "react";
import { storeContext } from "../store";

function Notifier() {
  const { enqueueSnackbar } = useSnackbar();
  const store = useContext(storeContext);
  const displayed = useRef([]);

  onSnapshot(store.notifications, (_) => {
    const notifications = store.notifications;
    if (notifications.length > 0) {
      notifications.forEach((notification) => {
        if (!displayed.current.includes(notification.id)) {
          enqueueSnackbar(notification.message, {
            preventDuplicate: true,
            key: notification.message,
            variant: notification.variant,
          });
          notification.remove();
        }
      });
    }
  });

  return null;
}

export default observer(Notifier);
