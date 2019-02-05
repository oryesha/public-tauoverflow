import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatMenu} from '@angular/material';
import {MessagingService} from '../services/messaging.service';

@Component({
  selector: 'app-notifications-card',
  templateUrl: './notifications-card.component.html',
  styleUrls: ['./notifications-card.component.scss']
})
export class NotificationsCardComponent implements OnInit {
  @ViewChild('notificationsMenu') notificationsMenu: MatMenu;

  @Output() menuClosed = new EventEmitter();

  constructor(private messagingService: MessagingService) {

  }

  ngOnInit() {
    // this.menuTrigger.openMenu();
  }

  destroyComponent() {
    this.menuClosed.emit();
  }
}
