import cliArgsOptions from './cli-options.js';

const cliHelpData = [
    {
        header: 'psrn - Packagefile Script RuNner',
        content: "A command line utility to help with running packagefile scripts after you (or someone else) created them."
    },
    {
        header: 'Usage',
        content: `
        psrn [-l] [-n|y] [--] [args]
        psrn [-l] [-n|y] [-a]
        psrn [--set-runner]
        psrn [--set-arguments-prompt]
        psrn []
        `
    },
    {
        header: 'CLI Options',
        optionList: cliArgsOptions
    }
];

export default cliHelpData;