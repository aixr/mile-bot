export let config = {
    // github app id
    id: '',

    // name of app
    name: '',

    // clients - 
        // id - unique identifier of client, requests will require this to be sent up as a header 'Client': '<id>' to authenticate
        // installation - the installation this client reresents
        // repo - name of the repo this client will be using
    clients: [
        {
            id: '',
            installation: 0,
            repo: ''
        }
    ],

    // this api url
    url: '',

    // applications private key
    key: ''
}