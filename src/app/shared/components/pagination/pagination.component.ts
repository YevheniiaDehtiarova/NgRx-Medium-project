import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps: number | undefined;
  @Input('limit') limitProps: number;
  @Input('url') urlProps: string;
  @Input('currentPage') currentPageProps: number;
  
  pagesCount: number;
  pages: Array<number>

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    const total = this.totalProps as number;
    this.pagesCount = Math.ceil(total / this.limitProps);
    this.pages = this.utilsService.range(1, this.pagesCount);
  }

}
