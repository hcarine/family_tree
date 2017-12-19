function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}
 
function Tree(data) {
    var node = new Node(data);
    this._root = node;
}
 
Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
 
        // step 1
    })(this._root);
 
};
/* 
Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
 
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};*/
 
Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};
 
Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data.name === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};
 
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data.name === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};
 
function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data.name === data.name) {
            index = i;
        }
    }
 
    return index;
}
var tree = new Tree(new BaseNode( "king Shan", "queen agna", "M"));

tree.add(new BaseNode( "ish", null, "M"), "king Shan", tree.traverseDF);

tree.add(new BaseNode( "chint", "ambi", "M"), "king Shan", tree.traverseDF);
tree.add(new BaseNode( "drita", "jaya", "M"), "chint", tree.traverseDF);
tree.add(new BaseNode( "jata", null, "M"), "drita", tree.traverseDF);
tree.add(new BaseNode( "driya", "mnu", "F"), "drita", tree.traverseDF);
tree.add(new BaseNode( "vrita", null, "M"), "chint", tree.traverseDF);

tree.add(new BaseNode( "vich", "lika", "M"), "king Shan", tree.traverseDF);
tree.add(new BaseNode( "vila", "jnki", "M"), "vich", tree.traverseDF);
tree.add(new BaseNode( "lavnya", "gru", "F"), "vila", tree.traverseDF);
tree.add(new BaseNode( "chika", "kpila", "F"), "vich", tree.traverseDF);

tree.add(new BaseNode( "satya", "vyan", "F"), "king Shan", tree.traverseDF);
tree.add(new BaseNode( "satvy", "asva", "F"), "satya", tree.traverseDF);
tree.add(new BaseNode( "savya", "krpi", "M"), "satya", tree.traverseDF);
tree.add(new BaseNode( "kriya", null, "M"), "savya", tree.traverseDF);
tree.add(new BaseNode( "saayan", "mina", "M"), "satya", tree.traverseDF);
tree.add(new BaseNode( "misa", null, "M"), "saayan", tree.traverseDF);

function BaseNode(name, marriedWith, gender){
    return {name, marriedWith,gender}
}
export default tree