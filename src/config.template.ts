export let config = {
    /**
     * @name id
     * @description ApplicationID provided by github
    */
    id: '',

    /**
     * @name name
     * @description name of your application 
     * is used as User-Agent header when making requests to github
     */
    name: '',

    /**
     * @name clients
     * @description array of verified clients
     * @var id identifier of client, should be sent up as a 'client' header when making requests
     * @var installation the github installation id this client will be using
     * @var repo the repo i.e. 'aixr/mile-bot'
     */
    clients: [
        {
            id: '',
            installation: 0,
            repo: ''
        }
    ],

    /**
     * @name url
     * @description this applications url
     */
    url: '',

    /**
     * @name key
     * @description private key for your github application
    */
    key: ''
}