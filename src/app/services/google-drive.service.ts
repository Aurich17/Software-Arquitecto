// import { Injectable } from '@angular/core';

// declare var gapi: any;

// @Injectable({
//   providedIn: 'root',
// })
// export class GoogleDriveService {
//   async uploadFile(file: File) {
//     try {
//       if (!gapi.auth || !gapi.auth.getToken()) {
//         throw new Error('Usuario no autenticado. Por favor, inicia sesión.');
//       }

//       const accessToken = gapi.auth.getToken().access_token;
//       if (!accessToken) {
//         throw new Error('No se pudo obtener el token de acceso.');
//       }

//       const metadata = {
//         name: file.name,
//         mimeType: file.type,
//       };

//       const form = new FormData();
//       form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
//       form.append('file', file);

//       const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
//         method: 'POST',
//         headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
//         body: form,
//       });

//       if (!response.ok) {
//         throw new Error(`Error en la subida: ${response.statusText}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error al subir el archivo:', error);
//       return { success: false, message: (error as Error).message };
//     }
//   }
// }
