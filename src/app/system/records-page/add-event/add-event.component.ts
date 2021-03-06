import {Component, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {USREvent} from '../../shared/models/event.model';

@Component({
  selector: 'usr-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.styl']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let { amount, description, category, type } = form.value;
    if (amount < 0 ) {
      amount *= -1;
    }

    const event = new USREvent(
        type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description
    );
  }


}
