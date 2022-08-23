import { Injectable } from '@angular/core';
import { User, UserData } from '../interface/user.interface';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private secretKey = 'herzfr';
  constructor() {}

  encryptDataUser(user: UserData) {
    sessionStorage.clear();
    sessionStorage.setItem(
      'USR',
      CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString()
    );
  }

  decryptDataUser() {
    let dataToken: any = sessionStorage.getItem('USR')
      ? sessionStorage.getItem('USR')
      : null;
    // console.log(dataToken);
    if (dataToken != null) {
      return JSON.parse(
        CryptoJS.AES.decrypt(dataToken, this.secretKey).toString(
          CryptoJS.enc.Utf8
        )
      );
    } else {
      return false;
    }
  }
}
