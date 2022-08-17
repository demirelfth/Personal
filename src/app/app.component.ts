import { Component } from '@angular/core';
import { InputsComponent } from './inputs/inputs.component';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(InputsComponent) private inputsComponent: InputsComponent;
  
  title = 'Personal';

  alertMessage:string = "";
  alertType:string = "";
  alertVisibility:boolean = false;

  delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async setAlert(message:string, type:string, ms:number){
    this.alertVisibility = true;
    this.alertMessage = message;
    this.alertType = type;
    await this.delay(ms);
    if(ms != 0){
      this.removeAlert();
    }
  }

  removeAlert(){
    this.alertVisibility = false;
    this.alertMessage = "";
    this.alertType = "";
  }

  callSetToUpdate(name:string, surname:string, email:string){
    this.inputsComponent.setToUpdate(name, surname, email);
  }
}
