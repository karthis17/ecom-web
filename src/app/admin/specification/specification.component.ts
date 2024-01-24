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
      this.submit(true);
      this.data = JSON.parse(this.data);
    }

    else {
      this.data = {}
    }

  }


  submit(isString = false) {
    if (isString) {
      console.log(JSON.parse(this.data));

      this.spec.emit(JSON.parse(this.data));
    } else {

      this.spec.emit(this.data);
    }
  }

}
