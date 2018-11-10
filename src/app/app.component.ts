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
  title = 2;
  // Single
  // title = {title: 'Test Madafaka'};
  options = [{text: 'Test 1 ', id: 1}, {text: 'Test 2', id: 2}, {text: 'Test 3', id: 3}, {text: 'Test 4', id: 4}, {text: 'Test 5', id: 5}];
  // options = [];
  private form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    // setTimeout(() => {
    //   this.title = [...this.title, 4];
    //   console.log(this.title, 'Outside');
    // }, 3000);
    this.form = this.fb.group({
      select: ['', Validators.required],
      name: ['']
    });
  }
  log(data) {
    this.http.get('https://jsonplaceholder.typicode.com/posts/' + this.title).subscribe();
  }
  submitted() {
    console.log(this.form.value);
  }
}
