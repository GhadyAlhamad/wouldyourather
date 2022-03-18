import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-messagesnackbar',
  templateUrl: './messagesnackbar.component.html',
  styleUrls: ['./messagesnackbar.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class MessageSnackbarComponent implements OnInit {
  constructor(
    public snackBarRef: MatSnackBarRef<MessageSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
