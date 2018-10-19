import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Multiple
  title = [{title: 'Test Madafaka'}];
  // Single
  // title = {title: 'Test Madafaka'};
  options = [{text: 'Test 1 ', id: 1}, {text: 'Test 2', id: 2}, {text: 'Test 3', id: 3}, {text: 'Test 4', id: 4}, {text: 'Test 5', id: 5}];
  constructor() {
    setTimeout(() => {
      this.title.push({title: 'Test Madafaka2'});
    }, 3000);
  }
  log(data){
    console.log(data);
  }
}
