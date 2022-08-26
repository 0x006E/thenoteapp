import React from "react";
import { store, storeContext } from "../store";

function StoreProvider({ children }) {
  const StoreContext = storeContext;
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export default StoreProvider;
