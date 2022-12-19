const REGISTER_MUTATION = `mutation ($username: String!, $password: String!) {
    register(options: {username: $username, password: $password}){
        errors{
            field
            message
        }
        user{
            id
            username
        }
    }
}`;

export default REGISTER_MUTATION;
