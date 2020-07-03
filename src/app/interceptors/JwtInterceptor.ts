
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private api: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.api.getUserValue();


        if (currentUser && currentUser.token) {

            console.log('Loaded intercept currentUser!!!');
            console.log(currentUser);

            console.log('Loaded intercept currentUser.token!!!');
            console.log(currentUser.token);
    

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });

            console.log('intercept RUNNED:');
            console.log(request);

        }

        return next.handle(request);
    }
}
