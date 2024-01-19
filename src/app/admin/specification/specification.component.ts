import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specification',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './specification.component.html',
  styleUrl: './specification.component.css'
})
export class SpecificationComponent {

  @Input() category!: string;
  @Input() data: any;
  @Output() spec = new EventEmitter<any>();

  ngOnInit() {
    if (this.data) {
      this.data = JSON.parse(this.data);
    }

    else {
      this.data = {}
    }

  }

  onChanges(changes: SimpleChanges) {

  }

  submit() {
    console.log(this.data);
    this.spec.emit(this.data);
  }

}
