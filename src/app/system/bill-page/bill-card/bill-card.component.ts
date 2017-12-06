import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/models/bill.models';

@Component({
  selector: 'usr-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.styl']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    const { rates } = this.currency;
    this.dollar = rates['USD'] * this.bill.value;
    this.euro = rates['EUR'] * this.bill.value;
  }

}
