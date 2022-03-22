import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector:'footer-app',
    templateUrl:'./footer.component.html',
    styleUrls:['./footer.component.css']
})
export class FooterComponent {
    pipe = new DatePipe('en-US');
    public autor:any = {nombre:'Samuel', apellido:'Villanueva', fecha: this.pipe.transform(Date.now(), 'yyyy')}
}
