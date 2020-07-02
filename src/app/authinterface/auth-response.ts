// export interface AuthResponse {
//     user: {
//         id: number,
//         name: string,
//         email: string,
//         access_token: string,
//         expires_in: number
//     }
// }

export interface AuthResponse {
    token: string;
    user_email: string;
    user_nicename: String;
    user_display_name: String;
  }