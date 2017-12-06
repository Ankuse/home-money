import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'usr-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.styl']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;
  currencies: string[] = ['USD', 'EUR'];
  constructor() { }

  ngOnInit() {
  }

}
