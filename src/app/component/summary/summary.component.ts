import { Component, OnInit } from '@angular/core';
import { StateStore } from '../../shared/interface/state-store.interface';
import { Subscription } from 'rxjs';
import { StoreService } from '../../common/store/store.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  state: StateStore;
  storeSubscription: Subscription;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeSubscription = this.storeService.getState().subscribe(state => {
      this.state = state;
    });
  }

}