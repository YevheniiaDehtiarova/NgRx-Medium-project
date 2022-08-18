import { Component, Input, OnInit } from '@angular/core';
import { PopularTagType } from '../../types/popularTag.type';

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  @Input('tags') tagsProps: Array<PopularTagType> = []

  constructor() { }

  ngOnInit(): void {
  }

}
