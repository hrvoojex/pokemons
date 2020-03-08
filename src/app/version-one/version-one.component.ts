import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IPokemonDetailsResponse, IResultSet, IPokemons } from '../data/IPokemons';
import { PokemonsRestService } from '../pokemons-rest.service';
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-version-one',
  templateUrl: './version-one.component.html',
  styleUrls: ['./version-one.component.css']
})
export class VersionOneComponent implements OnInit {
  pokemonsArray: IPokemons[] = [];
  resultSetArray: IResultSet[];
  displayedColumns: string[] = ['name', 'types', 'heightWeight', 'signatureAbility', 'baseExperience'];
  dataSource: MatTableDataSource<IResultSet>;

  title = "Version One";
  errorMessage: string = "";

  // Objekt za spremanje search inputa
  filterObj: {name: string, type: string} = {name: null, type: null};

  // Varijable za tablicu, paginator, inpute
  countPokemons: number;
  currentPageIndex = 0; 
  offset = 0; 
  limit = 10 
  isFirstLoading: boolean; // Flag da li je prvi upit
  isNameInputDisabled = false;
  isTypeInputDisabled = false;
  searchName: string;
  searchType: string;

  // MatPaginator Inputs
  pageSize = 10;
  pageSizeOptions: number[] = [10];

  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatPaginator, {static: false}) 
  paginator: MatPaginator;
  
  constructor(public restService:PokemonsRestService) { }
  
  ngOnInit() {
    this.isFirstLoading = true;
    this.fetchPagePokemons(this.offset, this.limit);
  }

  onPretraziClick() {
    this.isNameInputDisabled = false;
    this.isTypeInputDisabled = false;

    if (this.filterObj.name && this.filterObj.name != "") {
      this.restService.getPokemonByName(this.filterObj.name).subscribe(response => {
        this.errorMessage = "";
        this.pokemonsArray = [];
        this.countPokemons = 1;

        this.resultSetArray = [];
        this.resultSetArray.push({
            name: response['name'], 
            types: response['types'], 
            heightWeight: response['height'] + " / " + response['weight'], 
            signatureAbility: response['abilities'], 
            baseExperience: response['base_experience']
          });
          this.dataSource = new MatTableDataSource<IResultSet>(this.resultSetArray);
          this.dataSource.paginator = this.paginator;
        }, error => {
            this.countPokemons = 0;
            this.dataSource = null;
            if(error.status == 404) {
              this.errorMessage = "The name '" + this.filterObj.name + "' could not be found!";
            } else { 
              this.errorMessage = error.message;
            }
            throw this.errorMessage;
          }
        );
      } 
      else if (this.filterObj.type && this.filterObj.type != "") {
        this.restService.getPokemonsByType(this.filterObj.type).subscribe(response => {
          this.errorMessage = "";
          this.resultSetArray = [];
          let tempArray: Array<any> = response.pokemon;
          this.countPokemons = response.pokemon.length;
       
          tempArray.forEach(item => {
            this.restService.getPokemonDetails(item.pokemon.url).subscribe((resp: any) => {
             this.resultSetArray.push({
                name: resp['name'], 
                types: resp['types'], 
                heightWeight: resp['height'] + " / "+ resp['weight'], 
                signatureAbility: resp['abilities'], 
                baseExperience: resp['base_experience']
              });
              console.log("this.resultSetArray: ", this.resultSetArray);
              this.dataSource = new MatTableDataSource<IResultSet>(this.resultSetArray);
              console.log(this.dataSource);
              this.dataSource.paginator = this.paginator;
            });
          });
        }, error => {
          this.countPokemons = 0;
          this.dataSource = null;
          if(error.status == 404) {
            this.errorMessage = "The type '" + this.filterObj.type + "' could not be found!";
          } else {
            this.errorMessage = error.message;
          }
          throw this.errorMessage;
        });
        this.isFirstLoading = false;
      }
      else {
        this.errorMessage = "";
        this.fetchPagePokemons(this.offset, this.limit);
      }
    }

  applyFilter(searchProperty: string, searchValue: string) {
    console.log("searchValue: " + searchValue, " searchProperty: " + searchProperty);
    switch(searchProperty) {
      case 'name':
        this.filterObj.name = searchValue;
        this.filterObj.type = "";
        this.searchType = "";
        this.isNameInputDisabled = false;
        this.isTypeInputDisabled = true;
        console.log(this.filterObj);
        break;
      case 'type':
        this.filterObj.name = "";
        this.searchName = "";
        this.filterObj.type = searchValue;
        this.isNameInputDisabled = true;
        this.isTypeInputDisabled = false;
        console.log(this.filterObj);
        break;
      default:
        break;
    }
  }

  // Metoda koja se poziva pri promjeni stranice 
  nextPage(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.offset = this.currentPageIndex * this.limit;
    if (this.filterObj.type && this.filterObj.type != "") {
      return;
    }
    this.fetchPagePokemons(this.offset, this.limit);
  }

  fetchPagePokemons(offset: number, limit: number) {
    this.restService.getPokemons(offset, limit).subscribe(response => {
      this.pokemonsArray = response.results;
      this.countPokemons = response.count;
   
      this.pokemonsArray.forEach(item => {
        this.resultSetArray = [];
        this.restService.getPokemonDetails(item.url).subscribe((resp: any) => {
         this.resultSetArray.push({
            name: resp['name'], 
            types: resp['types'], 
            heightWeight: resp['height'] + " / "+ resp['weight'], 
            signatureAbility: resp['abilities'], 
            baseExperience: resp['base_experience']
          });
          console.log("this.resultSetArray: ", this.resultSetArray);
          this.dataSource = new MatTableDataSource<IResultSet>(this.resultSetArray);
          if (this.isFirstLoading) { 
            this.dataSource.paginator = this.paginator;
          }
        });
      });
    });
    this.isFirstLoading = false;
  }
}
