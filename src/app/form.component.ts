import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConversationalForm } from 'conversational-form';

@Component({
  selector: 'myForm',
  template: `<div class="myCF" #myCF></div>`,
  styles: [`.myCF { position: relative; border: 1px solid #666; margin: auto; height: 400px; width: 400px; }`]
})
export class FormComponent  {
  @ViewChild('myCF') myCF: ElementRef;
  cf:any;
  formFields = [
    {
      'tag': 'input',
      'type': 'text',
      'name': 'firstname',
      'cf-questions': 'What is your firstname?'
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'lastname',
      'cf-questions': 'What is your lastname?'
    }
  ];

  ngOnInit() {
    console.log('init', this)
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback.bind(this),
        preventAutoFocus: true,
      },
      tags: this.formFields
    });
    this.myCF.nativeElement.appendChild(this.cf.el);
  }

  submitCallback() {
    var formDataSerialized = this.cf.getFormData(true);
    console.log("Formdata, obj:", formDataSerialized);
    this.cf.addRobotChatResponse("You are done. Check the dev console for form data output.")
  }
}
