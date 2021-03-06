import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PokemonsRestService } from '../../pokemons-rest.service';

@Component({
  selector: 'app-version-two-modal',
  templateUrl: './version-two-modal.component.html',
  styleUrls: ['./version-two-modal.component.css']
})
export class VersionTwoModalComponent implements OnInit {
  name = '';
  type: Array<any> = [];
  weight = 0;
  height = 0;
  signatureAbility: Array<any> = [];
  doubleDamageFrom: Array<{name: string}> = [];
  doubleDamageTo: Array<{name: string}> = [];
  halfDamageFrom: Array<{name: string}> = [];
  halfDamageTo: Array<{name: string}> = [];
  noDamageFrom: Array<{name: string}> = [];
  noDamageTo: Array<{name: string}> = [];

  constructor(
    public pokemonRestService: PokemonsRestService,
    public dialogRef: MatDialogRef<VersionTwoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.name = this.data.name;

    this.pokemonRestService.getPokemonDetails(this.data.url).subscribe((response: any) => {
      this.type = response.types;
      this.weight = response.weight;
      this.height = response.height;
      this.signatureAbility = response.abilities;
      console.log('response getPokemonDetails---->', response);

      this.type.forEach(element => {
        this.pokemonRestService.getData(element.type.url).subscribe((response: any) => {
        console.log('response getData');

          // Double Damage To
        const ddt = response.damage_relations.double_damage_to;
        console.log('ddt-->', ddt);
        ddt.forEach(element => {
            console.log('element u ddt-u-->', element);
            this.doubleDamageTo.push(element.name);
            console.log('1this.doubleDamageTo', this.doubleDamageTo);
          });

          // Double Damage From
        const ddf = response.damage_relations.double_damage_from;
        console.log('ddf-->', ddf);
        ddf.forEach(element => {
            console.log('element u ddf-u-->', element);
            this.doubleDamageFrom.push(element.name);
            console.log('1this.doubleDamageFrom', this.doubleDamageFrom);
          });

          // Half Damage To
        const hdt = response.damage_relations.half_damage_to;
        console.log('hdt-->', hdt);
        hdt.forEach(element => {
            console.log('element u hdt-u-->', element);
            this.halfDamageTo.push(element.name);
            console.log('1this.halfDamageTo', this.halfDamageTo);
          });

          // Half Damage From
        const hdf = response.damage_relations.half_damage_from;
        console.log('hdf-->', hdf);
        hdf.forEach(element => {
            console.log('element u hdf-u-->', element);
            this.halfDamageFrom.push(element.name);
            console.log('1this.halfDamageFrom', this.halfDamageFrom);
          });

          // No Damage To
        const ndt = response.damage_relations.no_damage_to;
        console.log('ndt-->', ndt);
        ndt.forEach(element => {
            console.log('element u ndt-u-->', element);
            this.noDamageTo.push(element.name);
            console.log('1this.noDamageTo', this.noDamageTo);
          });

          // No Damage From
        const ndf = response.damage_relations.no_damage_from;
        console.log('ndf-->', ndf);
        ndf.forEach(element => {
            console.log('element u ndf-u-->', element);
            this.noDamageFrom.push(element.name);
            console.log('1this.noDamageFrom', this.noDamageFrom);
          });
        });
      });
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
