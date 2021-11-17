import React, { createContext, useMemo, useState } from "react";
import { IDataContext } from "../webparts/toastmasterEvents/Interfaces/IContext";
import { IEventLikes } from "../webparts/toastmasterEvents/Interfaces/IEvent";

export const DataContext = createContext(null);

const DataContextProvider = props => {
  const [likes, setLikes] = useState<IEventLikes>(null);

  const value = useMemo(() => ({
    likes,
    setLikes
  }), [likes])

  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  )
}

export default DataContextProvider