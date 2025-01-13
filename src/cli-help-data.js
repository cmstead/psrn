import cliArgsOptions from './cli-options.js';

const cliHelpData = [
    {
        header: 'psrn - Packagefile Script RuNner',
        content: "A command line utility to help with running packagefile scripts after you (or someone else) created them."
    },
    {
        header: 'Usage',
        content: `psrn [-l] [-a] [--] [args]`
    },
    {
        header: 'CLI Options',
        optionList: cliArgsOptions
    }
];

export default cliHelpData;