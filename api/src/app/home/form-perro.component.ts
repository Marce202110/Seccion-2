import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form-perro',
  templateUrl: './form-perro.component.html',
  styleUrls: ['./form-perro.component.css'],
})
export class FormPerroComponent implements OnInit {
  dogForm: FormGroup;

  constructor(private fb: FormBuilder, private rutaActiva: ActivatedRoute) {
    this.dogForm = this.createForm();
  }

  ngOnInit() {
    if (
      this.rutaActiva &&
      this.rutaActiva.snapshot &&
      this.rutaActiva.snapshot.params
    ) {
      this.dogForm.patchValue({
        raza: this.rutaActiva.snapshot.params['raza'],
        url: this.rutaActiva.snapshot.params['url'],
      });
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      raza: ['', Validators.required],
      url: [''],
    });
  }

  get dogName(): string {
    return this.dogForm?.get('raza')?.value ?? 'Raza no encontrada';
  }

  get dogUrl(): string {
    return this.dogForm?.get('url')?.value ?? '';
  }

  get validForm(): boolean {
    return this.dogForm?.valid ?? false;
  }
}
