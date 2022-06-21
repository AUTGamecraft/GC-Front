import {Component, Input, OnInit} from '@angular/core';

export interface Creator {
  name: string;
  title: string;
  about: string;
  email: string;
  profile: string
}

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {
  @Input() creator: Creator;

  constructor() { }

  ngOnInit(): void {
  }

}
