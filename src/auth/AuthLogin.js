import { auth } from '../auth/Config'

export function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

export function logOut() {
    return auth.signOut()
}