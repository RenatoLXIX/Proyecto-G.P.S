import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserType } from '../models/user-type.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private selectedRoleSubject = new BehaviorSubject<UserType>(UserType.ESTUDIANTE);
  public selectedRole$ = this.selectedRoleSubject.asObservable();

  constructor() {}

  changeRole(newRole: UserType): void {
    this.selectedRoleSubject.next(newRole);
  }

  getCurrentRole(): UserType {
    return this.selectedRoleSubject.value;
  }
} 