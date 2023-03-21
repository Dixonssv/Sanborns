/*
  Referencias:
    https://www.npmjs.com/package/angular-org-chart

*/

import { Component } from '@angular/core';
import { OrgData } from 'angular-org-chart/src/app/modules/org-chart/orgData';

@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: ['./organigrama.component.css']
})
export class OrganigramaComponent {
  orgData: OrgData= {
    name: "Iron Man",
    type: 'CEO',
    children: [
        {
            name: "Captain America",
            type: 'VP',
            children: [
                {
                    name: "Hawkeye",
                    type: 'manager',
                    children: []
                },
                {
                    name: "Antman",
                    type: 'Manager',
                    children: []
                }
            ]
        },
        {
            name: "Black Widow",
            type: 'VP',
            children: [
                {
                    name: "Hulk",
                    type: 'manager',
                    children: [
                        {
                            name: "Spiderman",
                            type: 'Intern',
                            children: []
                        }
                    ]
                },
                {
                    name: "Thor",
                    type: 'Manager',
                    children: [
                        {
                            name: "Loki",
                            type: 'Team Lead',
                            children: []
                        }
                    ]
                }
            ]
        }
    ]
  };
}
