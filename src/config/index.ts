// containter for all environments

const environments = {
    development: {},
    production:{},
    testing:{}
};

// staging environment (default)
environments.development = {
    httpPort: process.env.PORT ||  3000,
    envName:  process.env.NODE_ENV || 'development',
    secret: process.env.SECRET || 'thisisasecret',
    mongoUrl:process.env.MONGO_URL || 'mongodb://localhost:27017/social-app'
}

// production environment
environments.production = {
    httpPort: process.env.PORT || 3000,
    envName: process.env.NODE_ENV || 'production',
    secret:process.env.SECRET || 'thisisasecret',
    mongoUrl:process.env.MONGO_URL
}

// determine which environment was passed as a command-line argument
const currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : 'development';

//chech that the current environment is one of the environments above, if not, default to staging
// export the module
export default environments[currentEnvironment];