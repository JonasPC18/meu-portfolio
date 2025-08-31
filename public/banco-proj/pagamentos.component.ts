import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagamentos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss'],
})
export class PagamentosComponent {
  msg = signal<null | { ok: boolean; text: string }>(null);

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      linha: ['', Validators.required], // linha digitável / código de barras
      valor: [null as number | null, [Validators.required, Validators.min(0.01)]],
      data: [new Date().toISOString().slice(0, 10), Validators.required],
      descricao: [''],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.msg.set({ ok: false, text: 'Preencha os campos obrigatórios.' });
      return;
    }

    const payload = this.form.value;
    console.log('payload', payload);

    this.msg.set({ ok: true, text: 'Pagamento registrado!' });
    this.form.markAsPristine();
  }

  limpar() {
    this.form.reset({
      linha: '',
      valor: null,
      data: new Date().toISOString().slice(0, 10),
      descricao: '',
    });
    this.msg.set(null);
  }
}
