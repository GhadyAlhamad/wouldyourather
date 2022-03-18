import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pollcard',
  templateUrl: './pollcard.component.html',
  styleUrls: ['./pollcard.component.less'],
})
export class PollcardComponent implements OnInit {
  // properties
  @Input() user: string;
  @Input() avatarURL: any = '';
  @Input() questionId: string;
  @Input() optionOne: string;
  @Input() optionTwo: string;

  constructor(private elementRef: ElementRef, private router: Router) {
    // read passed attributes values
    this.user = this.elementRef.nativeElement.getAttribute('user');
    this.avatarURL = this.elementRef.nativeElement.getAttribute('avatarURL');
    this.questionId = this.elementRef.nativeElement.getAttribute('questionId');
    this.optionOne = this.elementRef.nativeElement.getAttribute('optionOne');
    this.optionTwo = this.elementRef.nativeElement.getAttribute('optionTwo');
  }

  ngOnInit(): void {}

  // view poll event
  viewPoll() {
    // navigate to question page
    this.router.navigate([`questions/${this.questionId}`]);
  }
}
