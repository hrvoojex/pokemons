export interface IPokemonResponse {
    count: number;
    next: string;
    previous: string;
    results: Array<INameUrl>;
}

export interface IPokemonDetailsResponse {
    name: string;
    types: Array<IType>;
    height: number;
    weight: number;
    abilities: Array<IAbility>;
    base_experience: number;
}

export interface INameUrl {
    name: string;
    url: string;
}

export interface IAbility {
    ability: Array<INameUrl>;
}

export interface IType {
    slot: number;
    type: Array<INameUrl>;
}

export interface IPokemons {
    name: string;
    url: string;
}

export interface IResultSet {
    name: string;
    types: Array<any>;
    heightWeight: string;
    signatureAbility: Array<any>;
    baseExperience: number;
}

export interface IResultSetModal {
    types: Array<any>;
    weight: number;
    height: number;
    signatureAbility: Array<any>;
    doubleDamageFrom: Array<any>;
    doubleDamageTo: Array<any>;
    halfDamageFrom: Array<any>;
    halfDamageTo: Array<any>;
    noDamageFrom: Array<any>;
    noDamageTo: Array<any>;
}
