export enum AppPagesRoute {
    Main='/',
    SignIn = '/login',
    MyList = '/mylist',
    Film = '/films/:id',
    AddReview = '/films/:id/review',
    Player = '/player/:id'
}

export enum AuthStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export const MAX_RATING_FILM = 10;

export enum APIRoute {
    Films = '/films',
    Login = '/login',
    Logout = '/logout',
}


export const HOW_MATCH_SHOW_FILMS = 8;

export const TABS = ['Overview', 'Details', 'Reviews'];
