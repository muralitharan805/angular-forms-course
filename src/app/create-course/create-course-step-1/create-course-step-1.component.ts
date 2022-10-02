import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { courseTitleValidator } from "../../validators/course-title-valitator";

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  // form: FormGroup;

  courseCategories$: Observable<any>;
  form = this.fb.group({
    title: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
        asyncValidators: [courseTitleValidator(this.course)],
      },
    ],
    releasedAt: [new Date(), Validators.required],
    downloadAllowed: [false, Validators.requiredTrue],
    longDes: ["", Validators.required],
    category: ["BEGINNER", Validators.required],
    address: ["", Validators.required],
  });
  constructor(private fb: FormBuilder, private course: CoursesService) {}

  get courseTitle() {
    return this.form.controls["title"];
  }
  ngOnInit() {
    this.courseCategories$ = this.course.findCourseCategories();
  }
}
