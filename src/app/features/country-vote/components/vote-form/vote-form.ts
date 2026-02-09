import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryvoteApiService } from '../../../../core/services/countryvote-api.service';
import { CountryOption } from '../../../../core/models/country.model';

@Component({
  selector: 'app-vote-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vote-form.html',
  styleUrls: ['./vote-form.scss'],
})
export class VoteForm {
  @Output() voted = new EventEmitter<void>();

  countries: CountryOption[] = [];
  loadingCountries = true;

  submitting = false;
  successMsg: string | null = null;
  errorMsg: string | null = null;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: CountryvoteApiService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.api.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.loadingCountries = false;
      },
      error: () => {
        this.loadingCountries = false;
        this.errorMsg = 'Error loading countries';
      },
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.submitting) return;
    this.successMsg = null;
    this.errorMsg = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.api.submitVote({
      name: this.form.value.name!,
      email: this.form.value.email!,
      countryCode: this.form.value.countryCode!,
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.successMsg = 'Your vote was successfully submitted';
        this.form.reset();
        this.voted.emit();
        setTimeout(() => (this.successMsg = null), 2500);
      },
      error: (err) => {
        this.submitting = false;
        this.errorMsg = err?.error?.message ?? 'Could not submit vote';
      },
    });
  }


}