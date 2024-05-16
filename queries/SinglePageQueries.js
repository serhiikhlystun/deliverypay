export const SinglePageQuery = `
    #graphql
    query SinglePage($page_slug: String) {
        pages(filter: {slug: {_eq: $page_slug}}) {
            id
            slug
            title
            content
        }
    }
`
