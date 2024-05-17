export const socialQuery = `
    #graphql
    query Social {
        socials {
            id
            Title
            URL
            Icon {
                id
            }
        }
    }
`