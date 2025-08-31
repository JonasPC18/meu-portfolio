import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BalanceService {
  private _saldo = signal(3567.89);
  private _mostrar = signal(true);

  readonly saldo = this._saldo.asReadonly();
  readonly mostrar = this._mostrar.asReadonly();

  setSaldo(valor: number) { this._saldo.set(valor); }
  toggleMostrar() { this._mostrar.update(v => !v); }
}
