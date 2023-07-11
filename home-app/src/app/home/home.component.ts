import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="result">
        <app-housing-location 
          *ngFor="let housingLocation of filteredList"
          [housingLocation]="housingLocation"
          >
        </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((data) => {
      this.housingLocationList = data;
      this.filteredList = data;
    });
  }

  filterResults(filter: string) {
    if (!filter) this.filteredList = this.housingLocationList;

    this.filteredList = this.housingLocationList.filter((housingLocation) => {
      return housingLocation?.city.toLowerCase().includes(filter.toLowerCase());
    });
  }
}
