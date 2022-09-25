import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      courseType: ["premiun", Validators.required],
      price: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(999),
          Validators.pattern("[0-9]"),
        ],
      ],
      promst: [new Date(), Validators.required],
      promed: [new Date(), Validators.required],
    });
  }
  ngOnInit() {
    this.form.valueChanges.subscribe((data) => {
      const priceControl = this.form.controls["price"];

      console.log(data);

      if (data.value == "free" && priceControl.enabled) {
        priceControl.disable({ emitEvent: false });
      } else if (data.value == "premiun" && priceControl.disabled) {
        priceControl.enable({ emitEvent: false });
      }
    });
  }
}
