import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {MatSidenav} from '@angular/material/sidenav';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { ResourceNode } from './shared/models/foodNode';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ExampleFlatNode } from './shared/models/exampleFlatNode';
import {FlatTreeControl} from '@angular/cdk/tree';

const TREE_DATA: ResourceNode[] = [
  {
    name: 'Low Access',
    children: [
      {name: 'Sponge bob - The Lid'},
      {name: 'Sponge bob - Theme song'}
    ]
  }, {
    name: 'High Access',
    children: [
      {name: 'Sponge bob - Sweet Victory'},
      {name: 'Alien Ant Farm - Smooth Criminal'},
    ]
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _transformer = (node: ResourceNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;

  title = 'gatekeeper-ui';
  items: MenuItem[] = [];
  showFiller = false;
  reason = '';

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
  ){
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {}

  close(reason: string) {
    this.reason = reason;
    this.treeControl.collapseAll();
    this.sidenav.close();
  }
}
