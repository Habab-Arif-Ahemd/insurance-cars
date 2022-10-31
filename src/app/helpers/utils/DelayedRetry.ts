import { Observable, of } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';


const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_OFFSET = 1000;


export function delayedRetry(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES, offsetMs = DEFAULT_OFFSET) {
   let retries = maxRetry;

   return (src: Observable<any>) => src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
         mergeMap(error => {
            if (retries-- > 0) {
               const offsetTime = delayMs + (maxRetry - retries) * offsetMs;
               return of(error).pipe(delay(offsetTime));
            }
         })
      ))
   );
}

const getErrorMessage = (maxRetry) => 'Tried to load resource for ${maxRetry} times without success.';
