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
        name: 'version',
        type: Boolean,
        description: 'Show version number'
    },
];

export default cliArgsOptions;