const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb://admin:nofood123456@ds031193.mlab.com:31193/nofood'
    },
    Security: {
        secretyKey: 'd41d8cd98f00b204e9800998ecf8427e|039865f4f37eb2cf4b4841a5dbb5f1f7'
    }
}

module.exports = variables;