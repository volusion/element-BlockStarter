module.exports = {
    projects: [
        {
            displayName: 'test',
            snapshotSerializers: [
                'enzyme-to-json/serializer',
                'jest-aphrodite-react'
            ]
        },
        {
            runner: 'jest-runner-eslint',
            displayName: 'lint',
            testMatch: ['<rootDir>/**/*.js']
        }
    ]
};
