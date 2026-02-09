import { Component } from '@angular/core';
import { VoteForm } from '../../components/vote-form/vote-form';
import { TopTable } from '../../components/top-table/top-table';

@Component({
  selector: 'app-home',
  imports: [VoteForm, TopTable],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  refreshToken = 0;

  onVoted() {
    this.refreshToken++;
  }

}
