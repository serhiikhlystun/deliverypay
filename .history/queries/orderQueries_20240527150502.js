export const createOrder = `
mutation create_orders_item ($data: create_orders_input!) {
    create_orders_item(
        data: $data
    ) {
        id
        products {
            id
            quantity
        }
        name
        email
        location
        phone
        discount
        total_price
    }
}
`;

export const userOrderHistory = `
    query orders ($user_id: String!) {
        orders (filter: { user_id: { id: { _eq: $user_id } } }) {
            id
            products {
                id
                quantity
            }
            status
            name
            email
            location
            phone
            total_price
            discount
        }
    }
`;

export const createGuestOrder = `
mutation create_orders_item ($data: create_orders_input!) {
    create_orders_item(
        data: $data
    )
}
`;
