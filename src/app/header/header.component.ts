import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { ErrorHandlerService } from '../services/error/error-handler.service';

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
    private commonService: CommonService,
    public errorHandlerService: ErrorHandlerService
  ) {}

  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDate = inputElement.value;
    this.commonService.updateDate(this.selectedDate);
  }
}
