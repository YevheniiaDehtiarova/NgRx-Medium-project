import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: any;
  errorMessages: Array<string>;

  constructor() { }

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
      const messages = this.backendErrorsProps.message;
    
      return `${messages}`
    })
  }

}
