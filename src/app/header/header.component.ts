import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { ErrorHandlerService } from '../services/error/error-handler.service';
import { AppStateService } from '../services/states/app-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class HeaderComponent {
  selectedDate: string | undefined;

  constructor(
    private appState: AppStateService,
    public errorHandlerService: ErrorHandlerService
  ) {}

  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDate = inputElement.value;
    this.appState.loadNextPage(this.selectedDate, 1);
  }
}
