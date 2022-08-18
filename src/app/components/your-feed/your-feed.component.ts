import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mc-your-feed',
  templateUrl: './your-feed.component.html',
  styleUrls: ['./your-feed.component.scss']
})
export class YourFeedComponent implements OnInit {
  apiUrl= '/articles/feed'
  constructor() { }

  ngOnInit(): void {
  }

}
