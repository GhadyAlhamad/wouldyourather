import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboardcard',
  templateUrl: './leaderboardcard.component.html',
  styleUrls: ['./leaderboardcard.component.less'],
})
export class LeaderboardcardComponent implements OnInit {
  // properties
  @Input() user: string;
  @Input() avatarURL: string;
  @Input() rank: number;
  @Input() answeredQuestion: number;
  @Input() createdQuestion: number;

  constructor(private elementRef: ElementRef) {
    // read passed attributes values
    this.user = this.elementRef.nativeElement.getAttribute('user');
    this.avatarURL = this.elementRef.nativeElement.getAttribute('avatarURL');
    this.rank = this.elementRef.nativeElement.getAttribute('rank');
    this.answeredQuestion =
      this.elementRef.nativeElement.getAttribute('answeredQuestion');
    this.createdQuestion =
      this.elementRef.nativeElement.getAttribute('createdQuestion');
  }

  ngOnInit(): void {}

  // get score
  getScore() {
    return this.answeredQuestion + this.createdQuestion;
  }
}
