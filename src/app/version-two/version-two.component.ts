import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonsRestService } from '../pokemons-rest.service';
import { IPokemons, IResultSetModal } from '../data/IPokemons';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { VersionTwoModalComponent } from './version-two-modal/version-two-modal.component';

@Component({
  selector: 'app-version-two',
  templateUrl: './version-two.component.html',
  styleUrls: ['./version-two.component.css']
})
export class VersionTwoComponent implements OnInit {
  title = "Version Two";

  pokemonsArray: IPokemons[] = [];
  resultSetTableArray: IPokemons[] = [];
  resultSetModalArray: IResultSetModal[] = [];
  displayedColumns: string[] = ['name', 'details'];
  dataSource: MatTableDataSource<IPokemons> = null;
  errorMessage: string = "";
  noDataMessage: string = "";
  countPokemons: number;
  offset: number;
  limit: number;
  isFirstLoading: boolean;
  isFirstSearch: boolean;
  searchName: string = "";
  currentPageIndex = 0;

  // Za spremanje search inputa
  filterObj: {name: string, url: string} = {name: null, url: null};

  // MatPaginator
  pageSize = 10;
  pageSizeOptions: number[] = [10];
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(public restService:PokemonsRestService, public dialog: MatDialog) { }

  ngOnInit() {
    this.initVariables();
  }

  initVariables() {
    this.restService.getPokemons(0, 1).subscribe(response => {
      this.countPokemons = response.count;
    });
    this.isFirstSearch = true;
    this.isFirstLoading = true;
    this.offset = 0;
    this.limit = 10;
    this.fetchPagePokemons(this.offset, this.limit);
  }

  fetchPagePokemons(offset: number, limit: number) {
    this.restService.getPokemons(offset, limit).subscribe(response => {
      this.pokemonsArray = response.results;
      this.countPokemons = response.count;
      this.dataSource = new MatTableDataSource<IPokemons>(this.pokemonsArray);
        if (this.isFirstLoading) { 
          this.dataSource.paginator = this.paginator;
        }
    });
    this.isFirstLoading = false;
  }

  openDetailsModal(row: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    // dialogConfig.height = "350px";
    dialogConfig.width = "80%";
    const dialog = this.dialog.open(VersionTwoModalComponent, dialogConfig);
  }

  // This method is called when changing a page
  nextPage(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.offset = this.currentPageIndex * this.limit;

    if (this.searchName && this.searchName != "") {
      return;
    }
    this.fetchPagePokemons(this.offset, this.limit);
  }

  filterPokemonNames(filter: string, pokemonsArray: IPokemons[]) {
    this.noDataMessage = "";
    let filteredArray: IPokemons[] = [];
    filter = filter.trim().toLowerCase();
    if (filter === '') {
      return pokemonsArray; // If filter is empty, return whole array
    }
    pokemonsArray.forEach(element => {
      if (filter && filter !== '') {
        if (element.name.indexOf(filter) !== -1) {
          filteredArray.push(element);
        }
      }
    });
    console.log("filteredArray: ", filteredArray);
    if (filteredArray.length === 0) {
      this.noDataMessage = "No data for pokemon " + this.searchName
    }
    return filteredArray;
  }

  applyFilter(filterValue: string) {
    let resultArray: IPokemons[] = [];

    if (filterValue === '') {
      this.initVariables();
    }

    if (this.isFirstSearch) {
      this.restService.getPokemons(0, 1).subscribe(response => {
        this.countPokemons = response.count;
      });

      this.restService.getPokemons(0, this.countPokemons).subscribe(response => {
        this.pokemonsArray = response.results;
        resultArray = this.filterPokemonNames(filterValue, this.pokemonsArray);
        this.dataSource = new MatTableDataSource<IPokemons>(resultArray);
        this.dataSource.paginator = this.paginator;
      });
      this.isFirstSearch = false;
    }
    else { // If it is not a first search, don't fetch again, use an old array
      resultArray = this.filterPokemonNames(filterValue, this.pokemonsArray);
      this.dataSource = new MatTableDataSource<IPokemons>(resultArray);
      this.dataSource.paginator = this.paginator;
    }
  }
}
