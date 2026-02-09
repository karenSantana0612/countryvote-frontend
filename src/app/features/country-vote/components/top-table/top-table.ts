import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopCountryRow } from '../../../../core/models/top-country.model';
import { CountryvoteApiService } from '../../../../core/services/countryvote-api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-top-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-table.html',
  styleUrl: './top-table.scss',
})
export class TopTable implements OnInit, OnChanges {
  @Input() refreshToken = 0;

  q = '';
  rows: TopCountryRow[] = [];
  filtered: TopCountryRow[] = [];
  loading = false;
  errorMsg: string | null = null;

  constructor(
    private api: CountryvoteApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken']) this.load();
  }

  load(): void {
    this.loading = true;
    console.log('[TopTable] load() called');

    this.api.getTop10(this.q).pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
        console.log('[TopTable] load() finished');
      })
    ).subscribe({
      next: (data) => {
        console.log('[TopTable] top10 size', data?.length, data);
        this.rows = data ?? [];
        this.filtered = [...this.rows];
        this.cdr.detectChanges(); // <- CLAVE
      },
      error: (err) => {
        console.error('[TopTable] top10 error', err);
        this.cdr.detectChanges();
      }
    });
  }

  applyFilter() {
    const term = (this.q ?? '').trim().toLowerCase();
    if (!term) {
      this.filtered = [...this.rows];
      this.cdr.detectChanges();
      return;
    }

    this.filtered = this.rows.filter(r =>
      (r.name ?? '').toLowerCase().includes(term) ||
      (r.capital ?? '').toLowerCase().includes(term) ||
      (r.region ?? '').toLowerCase().includes(term) ||
      (r.subregion ?? '').toLowerCase().includes(term)
    );
    this.cdr.detectChanges();
  }
}
