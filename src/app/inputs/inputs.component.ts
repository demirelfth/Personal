import { Component, OnInit } from '@angular/core';
import * as DataJson from '../../../data.json';
import { InputsService } from '../services/inputs.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {

  addButtonName:string = "Add";
  updateButtonName:string = "Update";
  buttonName:string = this.addButtonName;

  name:string = "";
  surname:string = "";
  email:string = "";

  prevName:string = "";
  prevSurname:string = "";
  prevEmail:string = "";

  jsonContent:any;
  jsonNewRecord:any;
  jsonUpdateRecord:any;
  jsonResponseContent:any;

  isItAdd:boolean =true;

  alertMessage:string = "";
  alertType:string = "";
  alertTime:number = 5000;
  alertTimeZero:number = 0;

  atString:string = "@";

  isItUpdated:boolean =false;

  constructor(
    private inputsService:InputsService,
    private appComponent:AppComponent
  ) {

  }

  setPersonalRequest(){
    return new Promise((resolve,reject) => {
      this.inputsService.setPersonalData(this.jsonNewRecord)
      .subscribe((res)=>{
        this.jsonResponseContent = res;
        //console.log(this.jsonResponseContent);
        resolve(res);
      },(err)=>{
        console.log(err);
      });
    });
  }

  updatePersonalRequest(){
    return new Promise((resolve,reject) => {
      this.inputsService.updatePersonalData(this.jsonUpdateRecord)
      .subscribe((res)=>{
        this.jsonResponseContent = res;
        //console.log(this.jsonResponseContent);
        resolve(res);
      },(err)=>{
        console.log(err);
      });
    });
  }

  ngOnInit(): void {
    
  }

  delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetFields(){
    this.name = "";
    this.surname = "";
    this.email = "";
  }

  checkFunction(){
    if(this.isItAdd){
      this.setPersonal();
    }else{
      this.updatePersonal();
    }
  }

  getPersonal(){
    this.jsonContent = JSON.parse(JSON.stringify(DataJson));
  }

  async setPersonal(){
    await this.getPersonal();
    let isUnique = await this.isItUnique();
    let newRecord = "";

    if(isUnique){
      if(!this.email.includes(this.atString)){
        this.alertType = "warning";
        this.alertMessage = "E-mail field must be email format.(Contains @)";
        this.appComponent.setAlert(this.alertMessage, this.alertType, this.alertTimeZero);
      }else{
        newRecord = newRecord + '{"name":"' + this.name + '", "surname":"' + this.surname + '", "email":"' + this.email + '"}';
        this.jsonNewRecord = JSON.parse(newRecord);
        await this.setPersonalRequest();
        this.alertType = "success";
        this.alertMessage = "Successfully added personal.";
        this.resetFields();
        this.appComponent.setAlert(this.alertMessage, this.alertType, this.alertTime);
      }
    }else{
      this.alertType = "danger";
      this.alertMessage = "Personal already exist. With Name:" + this.name + " Surname:" + this.surname + " E-mail:" + this.email;
      this.resetFields();
      this.appComponent.setAlert(this.alertMessage, this.alertType, this.alertTime);
    }

  }

  isItUnique(){
    let isUnique = true;
    let lengthOfJson = this.jsonContent.default.length;

    for(let i = 0; i < lengthOfJson; i++){
      if(this.name == this.jsonContent.default[i].name && this.surname == this.jsonContent.default[i].surname && this.email == this.jsonContent.default[i].email){
        isUnique = false;
        break;
      }
    }

    return isUnique;
  }

  changeValueOfMethod(target:any,method:any){
    if(method == 1){
      this.name = target.value;
    }else if(method == 2){
      this.surname = target.value;
    }else if(method == 3){
      this.email = target.value;
      if(!this.email.includes(this.atString)){
        this.alertType = "warning";
        this.alertMessage = "E-mail field must be email format.(Contains @)";
        this.appComponent.setAlert(this.alertMessage, this.alertType, this.alertTimeZero);
      }else{
        this.appComponent.removeAlert();
      }
    }
  }

  setToUpdate(name:string, surname:string, email:string){
    this.isItAdd = false;
    this.buttonName = this.updateButtonName;

    this.prevName = name;
    this.prevSurname = surname;
    this.prevEmail = email;

    this.name = name;
    this.surname = surname;
    this.email = email;
  }

  endUpdateSession(){
    this.isItAdd = true;
    this.buttonName = this.addButtonName;
    this.isItUpdated = true;
  }

  async updatePersonal(){
    let isSame = await this.isItSame();
    let updateRecord = "";

    if(isSame){
      this.alertType = "warning";
      this.alertMessage = "Values are same with previous.";
      this.appComponent.setAlert(this.alertMessage, this.alertType, this.alertTimeZero);
    }else{
      updateRecord = updateRecord + '{"prevName":"' + this.prevName + '", "prevSurname":"' + this.prevSurname + '", "prevEmail":"' + this.prevEmail + '", "name":"' + this.name + '", "surname":"' + this.surname + '", "email":"' + this.email + '"}';
      this.jsonUpdateRecord = JSON.parse(updateRecord);
      await this.updatePersonalRequest();
      this.alertType = "success";
      this.alertMessage = "Successfully updated personal.";
      this.resetFields();
      this.appComponent.setAlert(this.alertMessage, this.alertType, this.alertTime);
      this.endUpdateSession();
      this.delay(5000);
    }
  }

  isItSame(){
    let isSame = false;

    if(this.prevName == this.name && this.prevSurname == this.surname && this.prevEmail == this.email){
      isSame = true;
    }

    return isSame;
  }

}
