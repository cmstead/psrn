const cliArgsOptions = [
    {
        name: 'arguments',
        alias: 'a',
        type: Boolean,
        description: 'Run script with additional arguments (prompt)'
    },
    {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Display this help message'
    },
    {
        name: 'long',
        alias: 'l',
        type: Boolean,
        description: 'Display select list with long script info'
    },
    {
        name: 'npm',
        alias: 'n',
        type: Boolean,
        description: 'Use npm to run commands'
    },
    {
        name: 'set-runner',
        type: Boolean,
        description: 'Set default script runner (npm or yarn)'
    },
    {
        name: 'set-arguments-prompt',
        type: Boolean,
        description: 'Default to requesting arguments for all script runs'
    },
    {
        name: 'version',
        type: Boolean,
        description: 'Show version number'
    },
    {
        name: 'yarn',
        alias: 'y',
        type: Boolean,
        description: 'Use yarn to run commands'
    },
];

export default cliArgsOptions;