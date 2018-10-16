import { Component } from '@angular/core';
import {ClickOutsideDirective} from 'ng-click-outside/lib/click-outside.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test version 2';
  options = [{title: 'Test 1 '}, {title: 'Test 2'}, {title: 'Test 3'}, {title: 'Test 4'}];
}
