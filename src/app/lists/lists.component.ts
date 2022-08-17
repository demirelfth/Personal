import { Component, OnInit } from '@angular/core';
import * as DataJson from '../../../data.json';
import { ListsService } from '../services/lists.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  jsonContent: any;
  personalData:CharacterData[][] = [];

  record:string = "";
  jsonRecord:any;

  jsonResponseContent:any;

  alertMessage:string = "";
  alertType:string = "";
  alertTime:number = 5000;
  alertTimeZero:number = 0;

  constructor(
    private listsService:ListsService,
    private appComponent:AppComponent
  ) {
    
  }

  deletePersonalRequest(){
    return new Promise((resolve,reject) => {
      this.listsService.deletePersonalData(this.jsonRecord)
      .subscribe((res)=>{
        this.jsonResponseContent = res;
        console.log(this.jsonResponseContent);
        resolve(res);
      },(err)=>{
        console.log(err);
      });
    });
  }

  ngOnInit(): void {
    this.getPersonal();
  }

  getPersonal(){
    this.jsonContent = JSON.parse(JSON.stringify(DataJson));
    for(let i = 0; i < this.jsonContent.length; i++){
      this.personalData.push([this.jsonContent[i].name, this.jsonContent[i].surname, this.jsonContent[i].email]);
    }
  }

  async updatePersonal(name:string, surname:string, email:string){
    await this.appComponent.callSetToUpdate(name, surname, email);
  }

  async deletePersonal(name:string, surname:string, email:string){
    this.record = '{"name":"' + name + '", "surname":"' + surname + '", "email":"' + email + '"}';
    this.jsonRecord = JSON.parse(this.record);
    this.alertType = "danger";
    this.alertMessage = "Successfully deleted.";
    this.appComponent.setAlert(this.alertMessage, this.alertType, this.alertTime);
    await this.deletePersonalRequest();
  }

}
