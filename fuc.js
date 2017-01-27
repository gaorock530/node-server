console.log('fuc.js running...');

const fs = require('fs');

var fatchNode = () => {
    try{
        var nodeString = fs.readFileSync('node-data.json');
        nodes = JSON.parse(nodeString);
        return nodes;
    }catch(e){
        return [];
    }
}

var saveNode = (nodes) => {
    fs.writeFileSync('node-data.json', JSON.stringify(nodes));
}

var add = (title, body) => {
    console.log('Adding Note:', title, body);
    var nodes = fatchNode();
    var node = {
        title,
        body
    };

    var duplicateNodes = nodes.filter((node) => node.title === title);

    if (duplicateNodes.length === 0){
        nodes.push(node);
        saveNode(nodes);
        return true;
    }

    return false;
    

};

var list = () => {
    console.log('Lising All Notes...');
    var nodes = fatchNode();

    if (nodes.length===0) return false;

    for (let i in nodes){
        console.log(i + " : " + nodes[i].title + " = " + nodes[i].body);
    }
    //nodes.forEach((node) => read(node));
    return nodes.length;

};

var read = (title) => {
    console.log('Read note: ', title);
    var nodes = fatchNode();
    var filteredNode = nodes.filter((node) => node.title === title);
    return filteredNode[0];
};

var remove = (title) => {
    console.log('Remove Note: ', title);
    var nodes = fatchNode();
    var modifiedNodes = nodes.filter((node) => node.title !== title);
    if (modifiedNodes.length !== nodes.length){
        saveNode(modifiedNodes);
        return true;
    }
    return false;
};

module.exports = {
    add,
    list,
    read,
    remove
};