import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CountryOption } from "../models/country.model";
import { VoteRequest } from "../models/vote.model";
import { TopCountryRow } from "../models/top-country.model";


@Injectable({ providedIn: 'root'})
export class CountryvoteApiService {
    private base = '/api';

    constructor(private http: HttpClient) {}

    getCountries(): Observable<CountryOption[]> {
        return this.http.get<CountryOption[]>(`${this.base}/countries/all?fields=name,flags,cca2`);
    }

    submitVote(payload: VoteRequest):Observable<void> {
        return this.http.post<void>(`${this.base}/votes`, payload);    
    }

    getTop10(q?: string): Observable<TopCountryRow[]> {
        let params = new HttpParams();
        if (q?.trim()) params = params.set('q', q.trim());
        return this.http.get<TopCountryRow[]>(`${this.base}/favorites/top10`, {params});
    }
}