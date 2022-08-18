import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mc-error-message',
  template: '<div>{{messageProps}}</div>',
})
export class ErrorMessageComponent  {
  @Input('message') messageProps: string = 'smth went wrong'
}
