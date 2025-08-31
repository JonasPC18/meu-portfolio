import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

type Tipo = 'PIX' | 'TED';

@Component({
  selector: 'app-transferencias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.scss'],
})
export class TransferenciasComponent {
  enviado = signal<null | { ok: boolean; msg: string }>(null);

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      tipo: ['PIX' as Tipo, Validators.required],
      valor: [null as number | null, [Validators.required, Validators.min(0.01)]],
      data: [new Date().toISOString().slice(0, 10), Validators.required],
      descricao: [''],

      // grupos por modo
      pix: this.fb.group({
        chavePix: ['', Validators.required],
      }),

      ted: this.fb.group({
        bancoCodigo: ['', Validators.required],
        agencia: ['', Validators.required],
        conta: ['', Validators.required],
        cpfCnpj: ['', Validators.required],
      }),
    });

    // estado inicial: PIX ativo, TED desativado
    this.setModo('PIX');

    // alterna conforme seleção
    this.form.get('tipo')!.valueChanges.subscribe((t: Tipo) => this.setModo(t));
  }

  private setModo(tipo: Tipo) {
    const pix = this.form.get('pix') as FormGroup;
    const ted = this.form.get('ted') as FormGroup;

    if (tipo === 'PIX') {
      pix.enable({ emitEvent: false });
      ted.disable({ emitEvent: false });
      // opcional: limpar TED
      // ted.reset({}, { emitEvent: false });
    } else {
      ted.enable({ emitEvent: false });
      pix.disable({ emitEvent: false });
      // opcional: limpar PIX
      // pix.reset({}, { emitEvent: false });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.enviado.set({ ok: false, msg: 'Preencha os campos obrigatórios.' });
      this.form.markAllAsTouched();
      return;
    }

    const { tipo, valor, data, descricao } = this.form.value as any;

    let destino: any;
    if (tipo === 'PIX') {
      destino = { tipo, chavePix: this.form.get('pix.chavePix')!.value };
    } else {
      destino = {
        tipo,
        bancoCodigo: this.form.get('ted.bancoCodigo')!.value,
        agencia: this.form.get('ted.agencia')!.value,
        conta: this.form.get('ted.conta')!.value,
        cpfCnpj: this.form.get('ted.cpfCnpj')!.value,
      };
    }

    // Aqui você chamaria seu serviço:
    // this.api.transferir({ destino, valor, data, descricao }).subscribe(...)
    console.log('payload:', { destino, valor, data, descricao });

    this.enviado.set({ ok: true, msg: 'Transferência registrada!' });
    this.form.markAsPristine();
  }

  limpar() {
    this.form.reset({
      tipo: 'PIX',
      valor: null,
      data: new Date().toISOString().slice(0, 10),
      descricao: '',
      pix: { chavePix: '' },
      ted: { bancoCodigo: '', agencia: '', conta: '', cpfCnpj: '' },
    });
    this.setModo('PIX');
    this.enviado.set(null);
  }
}
