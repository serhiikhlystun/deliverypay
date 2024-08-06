export const socialQuery = `
    #graphql
    query Social($status:String) {
        socials(
            filter: {status: {_eq:$status} }
        ) {
            id
            Title
            URL
            Icon {
                id
            }
        }
    }
`