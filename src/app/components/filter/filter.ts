import { Component, input, output } from '@angular/core';
import { FilterType } from '../../types/filter-types';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class FilterComponent {
  currentFilter = input.required<FilterType>();
  filterChanged = output<FilterType>();

  setFilter(newFilter: FilterType) {
    this.filterChanged.emit(newFilter);
  }
}
