import { observer } from "mobx-react";
import { onSnapshot } from "mobx-state-tree";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { storeContext } from "../store";

function Notifier() {
  const { enqueueSnackbar } = useSnackbar();
  const store = useContext(storeContext);

  onSnapshot(store.notifications, (notifications) => {
    if (notifications.length > 0) {
      notifications.forEach((notification) => {
        console.log("notification", notification);
        enqueueSnackbar(notification.message, {
          preventDuplicate: true,
          key: notification.id,
          variant: notification.variant,
        });
      });
    }
  });

  return null;
}

export default observer(Notifier);
