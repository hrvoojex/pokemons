import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IPokemonDetailsResponse, IType } from './data/IPokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonsRestService {

  constructor(private httpClient: HttpClient) { }

  url = "https://pokeapi.co/api/v2/";

  getData(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  getPokemons(offset: number, limit: number): Observable<any> {
    return this.httpClient.get<any>(this.url + 'pokemon/' + '?offset=' + offset + '&limit=' + limit );
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.httpClient.get<IPokemonDetailsResponse>(url);
  }

  getPokemonsByType(name: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'type/' + name);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.httpClient.get<IPokemonDetailsResponse>(this.url + 'pokemon/' + name);
  }



}
