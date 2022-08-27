import { observer } from "mobx-react";
import { onAction } from "mobx-state-tree";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { storeContext } from "../store";

function Notifier() {
  const { enqueueSnackbar, _ } = useSnackbar();
  const store = useContext(storeContext);

  useEffect(() => {
    const disposer = onAction(store, (call) => {
      console.info(
        "Action was called:",
        enqueueSnackbar(call.name, { variant: "success" })
      );
    });

    return () => {
      disposer();
    };
  }, []);
  return null;
}

export default observer(Notifier);
