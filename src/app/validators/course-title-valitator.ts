import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";

export function courseTitleValidator(course: CoursesService): AsyncValidatorFn {
  console.log("test");

  return (control: AbstractControl): Observable<ValidationErrors> => {
    console.log("test");

    return course.findAllCourses().pipe(
      tap((ele) => {
        console.log("data", ele);
      }),
      map((courses) => {
        const course = courses.find(
          (course) =>
            course.description.toLowerCase() == control.value.toLowerCase()
        );

        return course ? { titleExists: true } : null;
      })
    );
  };
}
