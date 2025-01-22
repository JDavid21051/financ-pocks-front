import { HttpContextToken } from '@angular/common/http';

export const SHOULD_INTERCEPT_REQUEST = new HttpContextToken(() => true);
