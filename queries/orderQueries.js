export const createOrder = `
mutation create_orders_item ($data: create_orders_input!) {
    create_orders_item(
        data: $data
    ) {
        id
        guest
        products {
            id
            quantity
        }
    }
}
`;

export const userOrderHistory = `
    query orders ($user_id: String!) {
        orders (filter: { user_id: { id: { _eq: $user_id } } }) {
            id
            guest
            products {
                id
                quantity
            }
            status
        }
    }
`;
