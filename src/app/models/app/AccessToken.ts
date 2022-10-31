export interface AccessToken {
   aud: string;​ // App name
   cid: string; // Client ID
   exp: number; // Expiry date (ms)
   iss: string; // Issue date (ms)
   jti: string; // User ID
   lng: string; // User language
   nbf: number; // Not valid before (ms)
   sub: string; // User email
   tel: string; // User phone number
}
