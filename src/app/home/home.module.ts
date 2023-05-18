import { NgModule } from '@angular/core';
import { HomeRoutingModule, routedComponents } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection/collection.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ],
  exports: [],
  declarations: [
    routedComponents,
    CollectionComponent
  ]
})
export class HomeModule {
}
