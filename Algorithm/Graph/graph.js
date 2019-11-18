// Instantiate a new graph
const Graph = function () {
    this.list = {};
};


// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function (node) {
    // 새로운 노드(배열)를 만들어서 그래프 리스트에 추가
    this.list[node] = {};
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function (node) {

    if(String(node) in this.list){
        return true;
    }else{
        return false;
    }

};

// Removes a node from the graph.
Graph.prototype.removeNode = function (node) {
    // 엣지 제거
    for(let edge in this.list[node]){
        this.removeEdge(node,edge);
    }
    // 노드 제거
    delete this.list[node];
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function (fromNode, toNode) {
    for(let edge in this.list[fromNode]){
        if(String(toNode) === edge){
            return true;
        }
    }
    return false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function (fromNode, toNode) {
    this.list[fromNode][toNode] = 1;
    this.list[toNode][fromNode] = 1;
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function (fromNode, toNode) {
    delete this.list[fromNode][toNode];
    delete this.list[toNode][fromNode];
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function (cb) {
    for(let node in this.list){
        cb(node);
    }
};
