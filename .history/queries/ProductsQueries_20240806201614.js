export const ProductsQuery = `
    #graphql
    query Products($offset: Int, $status: String) {
        products (
            limit: 20
            offset: $offset
            filter: {
               status: { _eq:$status}
            }
        ) {
            id
            status
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

export const SearchedProductsQuery = `
    #graphql
    query Products ($offset: Int, $product_name: String, $status: String) {
        products (
            limit: 20
            offset: $offset
            filter: {
                status: { _eq: $status } 
                product_name: { _icontains: $product_name}
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

export const CategoriesQuery = `
    #graphql
    query Categories($status:String) {
        categories(
         filter: { status: { _eq: $status } }
        ) {
            id
            category_name
            category_image {
                id
            }
            slug
        }
    }
`;

export const SelectedCategoryQuery = `
    #graphql
    query Categories ($category_slug: String, $status: String) {
        categories (
            filter: { 
                status: { _eq: $status } 
                slug: { _eq: $category_slug } 
            }
        ){
            id
            category_name
            category_image {
                id
            }
            slug
        }
    }
`;

export const SubCategoriesQuery = `
    #graphql
    query SubCategories($status: String) {
        subcategories(
          filter: {
               status: { _eq:$status}
            }
        ) {
            id
            subcategory_name
            slug
            parent_category {
                id
                category_name
            }
        }
    }
`;

export const SelectedSubCategoryQuery = `
    #graphql
    query SubCategories ($subcategory_slug: String, $status: String) {
        subcategories (
            filter: { 
                status: { _eq: $status }
                slug: { _eq: $subcategory_slug } 
            }
        ) {
            id
            subcategory_name
            slug
            parent_category {
                id
                category_name
                slug
            }
        }
    }
`;

export const FilteredProductsQuery = `
    #graphql
    query Products ($category: GraphQLStringOrFloat, $offset: Int, $status: String) {
        products (
            limit: 20
            offset: $offset
            filter: { 
                status: { _eq:$status}
                product_categories: { categories_id: { id: { _eq: $category } } } 
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

export const DoubleFilteredProductsQuery = `
    #graphql
    query Products ($category: GraphQLStringOrFloat, $offset: Int, $subcategory: GraphQLStringOrFloat, $status: String) {
        products (
            limit: 20
            offset: $offset
            filter: { 
                status: { _eq:$status}
                product_categories: { categories_id: { id: { _eq: $category } } }
                subcategory: {id: { _eq: $subcategory}}
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

export const FilteredSubcategoriesQuery = `
    #graphql
    query Subcategories($category: GraphQLStringOrFloat,$status: String) {
        subcategories(filter: { status: { _eq:$status} parent_category: { id: { _eq: $category } } }) {
            id
            subcategory_name
            slug
            parent_category {
                id
                category_name
            }
        }
    }
`;

export const SaleProductsQuery = `
    #graphql
    query Products ($offset: Int, $status: String) {
        products (
            limit: 20
            offset: $offset
            filter: { 
                status: { _eq:$status}
                new_price: { _nempty: true  } 
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

 export const TextForSlider = `
    #graphql
    query Text_for_slider($status:String) {
        text_for_slider(
        filter: { 
                status: { _eq:$status}
                new_price: { _nempty: true  } 
        }) {
            id
            Text
        }
    }
 `;

 export const СashbackQuery = `
     query Cashback {
        Cashback {
            percent
        }
    }
`;
