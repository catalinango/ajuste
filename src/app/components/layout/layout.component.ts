import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).on('click', '.sidebar a', function (e) {
      if($(this).attr('href') != '#') {
        $("body").removeClass('sidebar-open').addClass('sidebar-collapse').trigger('collapsed.pushMenu');
      } 
    });
   }
}
