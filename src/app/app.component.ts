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
  options = [{title: 'Test 1 '}, {title: 'Test 2'}, {title: 'Test 3'}, {title: 'Test 4'},{title: 'Test Madafaka'}];
  constructor() {
    setTimeout(() => {
      this.title.push({title: 'Test Madafaka2'});
    }, 3000);
  }
  log(data){
    console.log(data);
  }
}
