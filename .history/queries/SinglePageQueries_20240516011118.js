export const SinglePageQuery = `
    #graphql
    query SinglePage($page_slug: String) {
        pages(filter: {slug: {_eq: $page_slug}}) {
            id
            slug
            page_name
            price
            brand
            subcategory {
                id
                subcategory_name
                slug
            }
            page_description
            new_price
            page_image {
                id
            }
            page_categories {
                categories_id {
                    id
                    category_name
                    slug
                }
            }
            slides {
                id
                directus_files_id {
                    id
                }
            }
        }
    }
`
