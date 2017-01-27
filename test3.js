console.log('test3.js running...');

const _ = require('lodash');
const yargs = require('yargs');

const fuc = require('./fuc.js');

const titleDes = {
        describe: 'Title of a node',
        demand: true,
        alias: 't'
    },
    bodyDes = {
        describe: 'Content of a node',
        demand: true,
        alias: 'b'
    };

const argv = yargs
    .command('add', 'Add a new node.', {
        title: titleDes,
        body: bodyDes
    })
    .command('list', 'List all nodes')
    .command('read', 'Read a node', {
        title: titleDes
    })
    .command('remove', 'Remove a node', {
        title: titleDes
    })
    .help()
    .argv;


switch (argv._[0]) {
    case 'add':{
        var res = fuc.add(argv.title, argv.body);
        if (res) 
            console.log('Node Added!');
        else
            console.log('The node is already exist! TRY different Title~');
    }   
    break;

    case 'list':{
        var res = fuc.list();
        if (!res) 
            console.log('Nodes are Empty!');
        else
            console.log(`Listed ${res} Nodes`);
    }
    break;

    case 'read':{
        var res = fuc.read(argv.title);
        if (res){
            console.log(`Node found : ${res.title} = ${res.body}`);
        }else{
            console.log('Node not found');
        }
        
    }
    break;

    case 'remove':{
        var res = fuc.remove(argv.title);
        var message = res ? 'Node removed!' : 'Node Not Found!';

        console.log(message);

    }
    break;

}

