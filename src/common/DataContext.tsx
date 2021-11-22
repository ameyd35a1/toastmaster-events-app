import React, { createContext, useMemo, useState } from "react";

export const DataContext = createContext(null);

const DataContextProvider = props => {
  const [likes, setLikes] = useState(null);

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