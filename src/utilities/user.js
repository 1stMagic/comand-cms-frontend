function fullName(user) {
    if(user){
        if(user.firstName) {
            return user.firstName + " " + user.lastName
        }
        return user.salutation + " " + user.lastName
    }
    return ""
}

export { fullName }