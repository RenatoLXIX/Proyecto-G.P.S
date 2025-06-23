import { Component, OnInit } from '@angular/core';
import { UserType } from '../../models/user-type.model';
import { RoleService } from '../../services/role.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    currentUserType: UserType = UserType.ESTUDIANTE;
    userTypeValues = Object.values(UserType);
    userTypesEnum = UserType;
    userTypeLabels = {
        [UserType.ESTUDIANTE]: 'Estudiante',
        [UserType.PROFESOR]: 'Profesor',
        [UserType.ADMINISTRADOR]: 'Administrador'
    };

    constructor(private roleService: RoleService) {}

    ngOnInit(): void {
        this.roleService.selectedRole$.subscribe(role => {
            this.currentUserType = role;
        });
    }

    onChangeUserType(newType: UserType): void {
        this.roleService.changeRole(newType);
    }
} 