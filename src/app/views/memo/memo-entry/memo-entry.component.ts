import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'memo-entry',
  templateUrl: './memo-entry.component.html',
  styleUrls: ['./memo-entry.component.scss']
})
export class MemoEntryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

type MemoParam = {
  body: string,
};
