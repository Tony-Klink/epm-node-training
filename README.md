# EPAM NODE.JS TRAINING MODULES
- HOMEWORK 3 "Command Line. Debugging. Error handling / File System and Streams"

To run code:

- npm run start -- -a ACTION -optional_command

Available commands:

    -V, --version         output the version number
    -a, --Action [value]  Action
    -f, --file [value]    Input file
    -r, --read [value]    CSS READ directoty path
    -h, --help            output usage information

# Issue with -p argument:
For some reason I can't use -p/--path as command. It throws unuserful error. So I changed it to -r and --read respectively

# Why is --Action instead of --action?
Because .action is a function of **commander** library and can't be used as command line argument =(