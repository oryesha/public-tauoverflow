import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appNotificationHost]'
})
export class NotificationHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
