import { WebPartContext } from "@microsoft/sp-webpart-base";
import { createContext } from "react";


const AppContext = createContext<WebPartContext>(undefined);

export default AppContext;