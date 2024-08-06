export const ProductsQuery = `
    #graphql
    query Products($offset: Int) {
        products (
            limit: 20
            offset: $offset
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

export const SearchedProductsQuery = `
    #graphql
    query Products ($offset: Int, $product_name: String) {
        products (
            limit: 20
            offset: $offset
            filter: {
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
    query Categories {
        categories {
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
    query Categories ($category_slug: String) {
        categories (
            filter: { slug: { _eq: $category_slug } }
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
    query SubCategories {
        subcategories {
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
    query SubCategories ($subcategory_slug: String) {
        subcategories (
            filter: { slug: { _eq: $subcategory_slug } }
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
    query Products ($category: GraphQLStringOrFloat, $offset: Int) {
        products (
            limit: 20
            offset: $offset
            filter: { 
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
    query Products ($category: GraphQLStringOrFloat, $offset: Int, $subcategory: GraphQLStringOrFloat) {
        products (
            limit: 20
            offset: $offset
            filter: { 
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
    query Subcategories($category: GraphQLStringOrFloat) {
        subcategories(filter: { parent_category: { id: { _eq: $category } } }) {
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
    query Products ($offset: Int) {
        products (
            limit: 20
            offset: $offset
            filter: { 
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
    query Text_for_slider {
        text_for_slider {
            id
            Text
        }
    }
 `;

 export const Сashback = `
    #graphql
    query GetPercentageById($id: ID!) {
        percentages_by_id (id: 1){
            id
            percent
            status
        }
    }
`;
