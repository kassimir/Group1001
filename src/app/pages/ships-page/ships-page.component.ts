import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, combineLatest, first, forkJoin, map, Observable} from 'rxjs';
import { Theme, ThemeService } from '../../components/theme/theme.service';
import { TableHeaderPipe } from '../../pipes/table-header.pipe';

type ApiReturn = {
  count: number,
  next: string | null,
  previous: string | null,
  results: ShipData[]
}

type ShipData = {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  crew: string;
  edited: string;
  films: string[];
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  starship_class: string;
  url: string;
}

type RequiredTableData = Pick<ShipData, 'name' | 'model' | 'manufacturer'>;
type OptionalTableData = Omit<ShipData, 'name' | 'model' | 'manufacturer'>;
type TableData = (RequiredTableData & OptionalTableData) | RequiredTableData;
type OptionalColumnNames = keyof OptionalTableData;

@Component({
  selector: 'app-ships-page',
  templateUrl: './ships-page.component.html',
  styleUrls: ['./ships-page.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    NgClass,
    AsyncPipe,
    TableHeaderPipe
  ]
})
export class ShipsPageComponent implements OnInit {
  private http: HttpClient = inject(HttpClient);

  protected theme: BehaviorSubject<Theme> = ThemeService.theme;
  protected ships: TableData[] = [];
  protected filteredShips: BehaviorSubject<TableData[]> = new BehaviorSubject<TableData[]>([]);
  protected manufacturerAutoComplete: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  protected optionalColumnNames: OptionalColumnNames[] = [
    'MGLT',
    'cargo_capacity',
    'consumables',
    'crew',
    'edited',
    'films',
    'hyperdrive_rating',
    'length',
    'max_atmosphering_speed',
    'passengers',
    'pilots',
    'starship_class',
    'url'
  ];
  protected optionalColumnVals: boolean[] = new Array(this.optionalColumnNames.length).fill(false);

  private _requiredColumns: string[] = ['name', 'model', 'manufacturer'];
  protected displayedColumns: string[] = this._requiredColumns;
  private manufacturers: string[] = [];

  protected set autoCompleteControl(val: string) {
    this._autoCompleteControl = val;
    this.filterManufacturersAndShips(val);
  }
  protected get autoCompleteControl(): string {
    return this._autoCompleteControl;
  }
  private _autoCompleteControl: string = '';

  protected onCheck(ind: number, val: boolean): void {
    this.optionalColumnVals[ind] = val;
    this.displayedColumns = [
      ...this._requiredColumns,
      ...this.optionalColumnNames.filter( (_, i: number) => this.optionalColumnVals[i])
    ]
  }

  ngOnInit(): void {
    const api: string = 'https://swapi.dev/api/starships/?page=';
    const apiCalls: Observable<ApiReturn>[] = new Array(4).fill('').map((_, ind: number) => this.http.get<ApiReturn>(api + (ind + 1)));

    forkJoin(apiCalls)
      .subscribe(
        (apiReturns: ApiReturn[]) => {
        this.ships = apiReturns.map( a => a.results).flat();
        this.filteredShips.next(this.ships);
        this.manufacturers = Array.from(new Set(this.ships.map(s => s.manufacturer)));
        this.manufacturerAutoComplete.next(this.manufacturers);
    })
  }

  private filterManufacturersAndShips(filterVal: string) {
    this.manufacturerAutoComplete
      .pipe(first())
      .subscribe( ( mac: string[]) => {
        filterVal = filterVal.toLowerCase();
        const newShips = this.ships.filter(ship => ship.manufacturer.toLowerCase().includes(filterVal));
        const newMac = Array.from(new Set(newShips.map(ship => ship.manufacturer)));
        this.manufacturerAutoComplete.next(newMac);
        this.filteredShips.next(newShips);
      })
  }
}

