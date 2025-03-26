// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// declare var gapi: any;

// @Injectable({
//   providedIn: 'root',
// })
// export class GoogleAuthService {
//   private authInstance: any;
//   public isSignedIn$ = new BehaviorSubject<boolean>(false);

//   private CLIENT_ID = '209390540736-ava19ng5pl0r70p379cu94q3bos3ol12.apps.googleusercontent.com ';
//   private API_KEY = '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';
//   private SCOPES = 'https://www.googleapis.com/auth/drive.file';

//   constructor() {
//     this.initGoogleAuth();
//   }

//   private async initGoogleAuth() {
//     try {
//       await new Promise((resolve) => gapi.load('client:auth2', resolve));
//       await gapi.client.init({
//         apiKey: this.API_KEY,
//         clientId: this.CLIENT_ID,
//         scope: this.SCOPES,
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
//       });

//       this.authInstance = gapi.auth2.getAuthInstance();
//       this.isSignedIn$.next(this.authInstance.isSignedIn.get());
//       this.authInstance.isSignedIn.listen((status: boolean) => this.isSignedIn$.next(status));
//     } catch (error) {
//       console.error('Error inicializando Google API', error);
//     }
//   }

//   signIn() {
//     if (!this.authInstance) {
//       console.error('Google API no está listo aún.');
//       return;
//     }
//     this.authInstance.signIn();
//   }

//   signOut() {
//     this.authInstance.signOut();
//   }
// }
