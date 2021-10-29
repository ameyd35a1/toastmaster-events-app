import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ToastmasterEventsWebPartStrings';
import ToastmasterEvents from './components/ToastmasterEvents';
import { IToastmasterEventsProps } from './components/IToastmasterEventsProps';

export interface IToastmasterEventsWebPartProps {
  description: string;
}

export default class ToastmasterEventsWebPart extends BaseClientSideWebPart<IToastmasterEventsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IToastmasterEventsProps> = React.createElement(
      ToastmasterEvents,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
