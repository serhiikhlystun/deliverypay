export const createSubscribe = `
    #graphql
    mutation Create_subscribers_email_item ($email: String!) {
        create_subscribers_email_item(data: { email: $email })
    }
`;
