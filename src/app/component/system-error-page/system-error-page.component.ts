import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-system-error-page',
  templateUrl: './system-error-page.component.html',
  styleUrls: ['./system-error-page.component.css'],
  imports: [CommonModule]
})
export class SystemErrorPageComponent implements OnInit 
{
  @Input() errorMessage: string | null = null;
  public errorMessageToPrint: string = "Извините, на стороне сервера произошла ошибка, либо на сервере идут работы";

  //@Input("tryAgain") tryAgainCallback: (CallableFunction) | null = null;
  @Output("tryAgain") tryAgainCallback: EventEmitter<any> = new EventEmitter();

  constructor()
  {
    if(this.errorMessage !== null && this.errorMessage !== "")
    {
      this.errorMessageToPrint = "Ошибка: " + this.errorMessage;
    }
  }

  ngOnInit(): void {}

  tryAgain(): void
  {
    this.tryAgainCallback?.emit();
  }
}
