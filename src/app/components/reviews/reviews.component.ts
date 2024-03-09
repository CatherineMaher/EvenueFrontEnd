import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

// @Component({
//   selector: 'app-reviews',
//   standalone: true,
//   imports: [RatingModule,CommonModule,FormsModule,ReactiveFormsModule],
//   templateUrl: './reviews.component.html',
//   styleUrl: './reviews.component.css',
// })
@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ReviewsComponent implements OnInit {
  constructor(
    private myActivate: ActivatedRoute,
    private usrModel: UserService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ReviewForms!: FormGroup;
  userId = localStorage.getItem('userId');
  eventId = this.myActivate.snapshot.params['id'];

  addReview() {
    this.usrModel.setReveiw(this.userId).subscribe({
      // next:
    });
  }
}
