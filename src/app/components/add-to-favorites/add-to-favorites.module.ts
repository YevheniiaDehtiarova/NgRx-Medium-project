import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { AddToFavoriteService } from "./add-to-favorite.service";
import { AddToFavoritesComponent } from "./add-to-favorites.component";
import { AddToFavoriteEffect } from "./store/addToFavorite.effect";

@NgModule({
    imports: [CommonModule, RouterModule,
              EffectsModule.forFeature([AddToFavoriteEffect])],
    declarations: [AddToFavoritesComponent],
    exports: [AddToFavoritesComponent],
    providers: [AddToFavoriteService]
})

export class AddToFavoritesModule{
    
}