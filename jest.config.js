module.exports = {
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    testEnvironment: 'node',
}
