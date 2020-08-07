
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let currentUser = this.authService.getUserValue();

        if (currentUser) {

            if(!environment.production){
                console.log('Loaded intercept currentUser:');
                console.log(currentUser);
                console.log('Loaded intercept currentUser.token:');
                console.log(currentUser.token);
            }

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser}`
                }
            });

            console.log('intercept RUNNED, have USER:');
            console.log(request);
        }

        return next.handle(request);
    }
}
