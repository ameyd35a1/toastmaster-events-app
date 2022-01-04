import * as React from 'react';
import styles from './ToastmasterEvents.module.scss';
import { IToastmasterEventsProps } from './IToastmasterEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import MainComponent from './MainComponent/MainComponent';
import DataContextProvider from '../../../common/DataContext';

export default class ToastmasterEvents extends React.Component<IToastmasterEventsProps, {}> {
  public render(): React.ReactElement<IToastmasterEventsProps> {
    return (
      <div className={styles.toastmasterEvents}>
        <div className={styles.container}>
          <div className={styles.row}>
            {/* <div className={/*styles.column*/}
            <div className={styles.titleBg}>
              <div className={styles.title}>Toastmaster Events</div>
              {/* <div className={styles.subTitle}>Events</div> */}
              {/* <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a> */}
            </div>
            <DataContextProvider>
              <MainComponent />
            </DataContextProvider>
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}
