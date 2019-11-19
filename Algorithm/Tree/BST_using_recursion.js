const BinarySearchTree = function (value) {
    newTree = {};
    newTree.value = value;
    newTree.left = null;
    newTree.right = null;

    newTree.insert = function (value) {
        let childTree = BinarySearchTree(value);

        if(value < this.value){
            if(!this.left)
            this.left = childTree;
            else
            this.left.insert(value);
        }
        if(value > this.value){
            if(!this.right)
            this.right = childTree;
            else
            this.right.insert(value);
        }
    };

    newTree.contains = function (value) {
        if(value === this.value){
            console.log('I found it!!');
            return true;
        }else{
            if(value < this.value){
                if(this.left)   return this.left.contains(value);
            }
            else if(value > this.value){
                if(this.right)  return this.right.contains(value);
            }
            return false;
        }

        // //////////////////////////////////////////////
        // let curNode = this;

        // while (curNode) {
        //     if (curNode.value === value) {
        //         return true;
        //     } else if (value < curNode.value) {
        //         curNode = curNode.left;
        //     } else if (value > curNode.value) {
        //         curNode = curNode.right;
        //     }
        // }
        // return false;
        // //////////////////////////////////////////////
    };
    newTree.depthFirstLog = function (callback) {
        function preorder(curNode){
            callback(curNode.value);
            //왼쪽 자식이 있으면
            if(curNode.left){
                preorder(curNode.left);
            }
            //오른쪽 자식이 있으면
            else if(curNode.right){
                preorder(curNode.right);
            }
        }
        //}
        preorder(this);
    };

    return newTree;
}