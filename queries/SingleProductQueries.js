export const SingleProductQuery = `
    #graphql
    query SingleProduct($product_slug: String) {
        products(filter: {slug: {_eq: $product_slug}}) {
            id
            slug
            product_name
            price
            brand
            subcategory {
                id
                subcategory_name
                slug
            }
            product_description
            new_price
            product_image {
                id
            }
            product_categories {
                categories_id {
                    id
                    category_name
                    slug
                }
            }
        }
    }
`
