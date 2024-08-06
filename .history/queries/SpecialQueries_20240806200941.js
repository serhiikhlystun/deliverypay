export const SaleProductsQuery = `
    #graphql
    query Products($offset: Int, $status: String) {
        products (
            limit: 20
            offset: $offset
            filter: {
                new_price: { _empty: false }
            }
        ) {
            id
            product_name
            product_description
            price
            new_price
            slug
            subcategory {
                id
                subcategory_name
                slug
                parent_category {
                    id
                    category_name
                }
            }
            brand
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
`;

export const SaleSearchedProductsQuery = `
    #graphql
    query Products ($offset: Int, $product_name: String, $status: String) {
        products (
            limit: 20
            offset: $offset
            filter: {
                product_name: { _icontains: $product_name}
                new_price: { _empty: false }
                status: { _eq:$status}
            }
        ) {
            id
            product_name
            product_description
            price
            new_price
            slug
            subcategory {
                id
                subcategory_name
                slug
                parent_category {
                    id
                    category_name
                }
            }
            brand
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
`;

export const SaleFilteredProductsQuery = `
    #graphql
    query Products ($category: GraphQLStringOrFloat, $offset: Int) {
        products (
            limit: 20
            offset: $offset
            filter: { 
                product_categories: { categories_id: { id: { _eq: $category } } } 
                new_price: { _empty: false }
        }) {
            id
            product_name
            product_description
            price
            new_price
            slug
            subcategory {
                id
                subcategory_name
                slug
                parent_category {
                    id
                    category_name
                }
            }
            brand
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
 `;

export const SaleDoubleFilteredProductsQuery = `
    #graphql
    query Products ($category: GraphQLStringOrFloat, $offset: Int, $subcategory: GraphQLStringOrFloat) {
        products (
            limit: 20
            offset: $offset
            filter: { 
                product_categories: { categories_id: { id: { _eq: $category } } }
                subcategory: {id: { _eq: $subcategory}}
                new_price: { _empty: false }
        }) {
            id
            product_name
            product_description
            price
            new_price
            slug
            subcategory {
                id
                subcategory_name
                slug
                parent_category {
                    id
                    category_name
                }
            }
            brand
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
 `;