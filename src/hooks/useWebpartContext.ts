import React, { useContext } from 'react'
import { WebPartContext } from '@microsoft/sp-webpart-base'
import AppContext from '../common/AppContext'

export type UseWebPartContextReturn = (() => WebPartContext) &
    (<A>(mapContext: (context: WebPartContext) => A) => A);

const useWebPartContext: UseWebPartContextReturn = (mapContext?: (context: WebPartContext) => any) => {
    const context = useContext(AppContext);

    return mapContext ? mapContext(context) : context;
};

export { useWebPartContext };