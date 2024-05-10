export const createNewUser = `
    #graphql
    mutation createNewUser($data: create_directus_users_input!) {
        create_users_item(data: $data)
    }
`;

export const getCurrentUser = `
    #graphql
    query {
        users_me {
            id
            email
            first_name
            last_name
            location
            phone
        }
    }
`;

export const updateCurrentUser = `
    #graphql
    mutation updateCurrentUser($data: update_directus_users_input!) {
        update_users_me(data: $data) {
            id
            email
            first_name
            last_name
            location
            phone
        }
    }
`;

export const logoutUser = `
    #graphql
        mutation Auth_logout ($refresh_token: String) {
            auth_logout(refresh_token: $refresh_token)
    }
`;

export const refreshAuth = `
    #graphql
        mutation Auth_refresh ($refresh_token: String) {
            auth_refresh(refresh_token: $refresh_token, mode: json) {
                access_token
                expires
                refresh_token
            }
    }
`;
