import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private _mostrar = signal(true);
  private _saldo = signal<number>(3250.75);

  mostrar() { return this._mostrar(); }
  saldo() { return this._saldo(); }
  toggleMostrar() { this._mostrar.update(v => !v); }
}
