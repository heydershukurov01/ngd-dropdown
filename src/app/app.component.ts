import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Multiple
  title;
  // Single
  // title = {title: 'Test Madafaka'};
  options = [];
  // options = [];
  private form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    setTimeout(() => {
      this.options = [
        {'name': 'Heз biri', 'value': null}, {
        'name': '?laq?li istifad?зi qruplari',
        'value': '36',
      }, {'name': 'Reqlament', 'value': '35'}, {
        'name': 'S?xsl?r',
        'value': '32',
      }, {'name': 'Layih?l?r', 'value': '31'}, {
        'name': 'Qurumlar',
        'value': '30',
      }, {'name': 'Istidad?зi qruplari', 'value': '28'}, {
        'name': 'Menyular',
        'value': '29',
      }, {'name': 'Istifad?зi qrupu tipl?ri', 'value': '19'}, {
        'name': 'Sisteml?r',
        'value': '24',
      }, {'name': 'Istifad?зil?r', 'value': '18'}, {
        'name': 'Web servisl?r',
        'value': '17',
      }];
    }, 3000);
    this.form = this.fb.group({
      select: ['', Validators.required],
      name: ['']
    });
  }
  log(data) {
    console.log(data);
    // this.http.get('https://jsonplaceholder.typicode.com/posts/' + this.title).subscribe();
  }
  submitted() {
    console.log(this.form.value);
  }
}
