import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crypto-finance-challenge';
  btcPriceStart: number = 30022.69; //current bitcoin price 15.2.22 - the starting price.
  btcPriceChange: number = 0;
  btcPrice: number = this.btcPriceStart;
  cashOnHand: number = 100000;
  bitcoinOwned: number = 0;
  currentTracsaction: number | string = 0;
  amount: string[] | number = [];
  currentTracsactions: string[] = [];
  buyingPriceA: number = 0;
  buyingPriceQ: number = 0;

  constructor() {
    this.timeOut()
  }

  // This function is called every second to update the bitcoin price
  timeOut() {
    setTimeout(() => {
      this.btcPriceChange = ((Math.random())*2-1)*10
      this.btcPrice = this.btcPriceStart + this.btcPriceChange
      this.timeOut()
    }, 1000)
  }
  onInput(amount: number | string) {
    this.currentTracsaction = amount;
    this.buyingPriceA = 1
  }
  
  // quantity of bitcoin to buy
    onQuantity(quantityBtc: number | string) {
      this.currentTracsaction = quantityBtc;
      this.buyingPriceQ = 1
    }

  // buy transaction
  onBuy() {
    if (
       (this.cashOnHand < 0)

        ) {
            return alert("Not sufficient funds")
      } else {
        if ((this.buyingPriceA > 0) && (this.cashOnHand >= 0) && (this.currentTracsaction <= this.cashOnHand)) {
          this.buyingPriceA = this.btcPrice  
          this.currentTracsactions.push(String((Number(this.currentTracsaction)).toLocaleString('de-CH')))
        this.bitcoinOwned += (Number(this.currentTracsaction)/this.buyingPriceA);
        this.cashOnHand -= Number(this.currentTracsaction);
        console.log(Number(this.buyingPriceA))
        this.buyingPriceA = 0;
   
      
        } 
        if ((this.buyingPriceQ > 0)&& (this.cashOnHand >= 0) && (Number(this.currentTracsaction)*this.btcPrice <= this.cashOnHand)) {
          this.buyingPriceQ = this.btcPrice
          this.currentTracsactions.push(String((Number(this.currentTracsaction)*this.btcPrice).toLocaleString('de-CH')))
          this.bitcoinOwned += (Number(this.currentTracsaction));
          this.cashOnHand -= Number(this.currentTracsaction)*this.buyingPriceQ;
          this.buyingPriceQ = 0;
  
          } 
      }
      
  }

}
