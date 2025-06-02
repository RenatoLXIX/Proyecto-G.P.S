import { Component, OnInit } from '@angular/core';
import { UserType } from '../../models/user-type.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    currentUserType: UserType = UserType.ESTUDIANTE;
    userTypes = UserType;

    constructor() {}

    ngOnInit(): void {
        // Inicializa con tipo estudiante por defecto
        this.currentUserType = UserType.ESTUDIANTE;
    }

    onChangeUserType(newType: string): void {
        this.currentUserType = newType as UserType;
    }
} 