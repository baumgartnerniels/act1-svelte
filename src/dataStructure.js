import tree from "../data/app_data_structure.json";

class TreeNode {
  constructor(key) {
    this.key = key;
    this.children = [];
    this.parent = undefined;
    this.id = undefined;
    this.value = 0;
    this.label = "";
    this.level = "";
  }

  // Method to add a child to the current node
  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  findNodeByKey(key) {
    if (this.key === key) {
      return this; // Found the node
    }
    for (const child of this.children) {
      const result = child.findNodeByKey(key);
      if (result) {
        return result; // Recursively search in children
      }
    }
    return undefined; // Node not found
  }

  findNodeById(id) {
    if (this.id === id) {
      return this; // Found the node
    }
    for (const child of this.children) {
      const result = child.findNodeById(id);
      if (result) {
        return result; // Recursively search in children
      }
    }
    return undefined; // Node not found
  }

  findNodesBy(prop, value) {
    let nodes = [];
    if (this[prop] === value) {
      nodes.push(this); // Found the node
    }
    for (const child of this.children) {
      nodes = nodes.concat(child.findNodesBy(prop, value)); // Recursively concatenate found nodes
    }
    return nodes;
  }

  findNode(node, maxRecursions = Infinity) {
    if (this == node) {
      return this; // Found the node
    }

    // If maxRecursions is 0 or less, stop recursion
    if (maxRecursions <= 0) {
      return undefined;
    }

    // Recursively search in children with maxRecursions reduced by 1
    for (const child of this.children) {
      const result = child.findNode(node, maxRecursions - 1);
      if (result) {
        return result; // Found the node
      }
    }

    return undefined; // Node not found within recursion limit
  }

  // Method to check if the current node is a child of another node with a given key
  isChildOf(node) {
    let currentNode = this.parent; // Start from the parent
    while (currentNode) {
      if (currentNode == node) {
        return true; // Found the parent
      }
      currentNode = currentNode.parent; // Move up the tree
    }
    return false; // Parent not found
  }

  // Method to check if the current node is a parent of a node with a given key
  isParentOf(node) {
    return this.findNode(node) !== undefined; // Use findNode to check if the child exists in this subtree
  }

  isSiblingOf(node) {
    return this.parent.children.includes(node);
  }

  isCousinOf(node) {
    this.parent?.parent?.findNode(node, 3) !== undefined;
  }

  isRelatedUpDown(node) {
    return this.isChildOf(node) || this.isParentOf(node);
  }

  getDepth() {
    let depth = 0;
    let currentNode = this;

    // Traverse upwards and count the levels
    while (currentNode.parent !== undefined) {
      currentNode = currentNode.parent;
      depth++;
    }

    return depth; // Return the depth level
  }

  isRelated(node) {
    return (
      this.isChildOf(node) || this.isSiblingOf(node) || this.isParentOf(node)
    );
  }

  isRelatedToAny(list) {
    for (let e of list) {
      if (this.isRelated(e)) return true;
    }
    return false;
  }

  // Method to find all ancestors of the current node
  getAncestors() {
    const ancestors = [];
    let currentNode = this.parent;
    while (currentNode) {
      ancestors.push(currentNode); // Add parent to the ancestors list
      currentNode = currentNode.parent; // Move up the tree
    }
    return ancestors;
  }

  // Recursive method to get all descendants of the current node
  getDescendants() {
    const descendants = [];
    for (const child of this.children) {
      descendants.push(child); // Add the child itself
      descendants.push(...child.getDescendants()); // Recursively add all its descendants
    }
    return descendants;
  }

  // Method to get all related nodes (ancestors + descendants + self)
  getRelatedNodes() {
    const relatedNodes = [
      ...this.getAncestors(),
      this,
      ...this.getDescendants(),
    ];
    return relatedNodes;
  }

  getCountryKey() {
    const ranges = [
      { max: 3468, code: "ALB" },
      { max: 5202, code: "BIH" },
      { max: 6936, code: "KOS" },
      { max: 8670, code: "MNE" },
      { max: 10404, code: "MKD" },
      { max: 12137, code: "SRB" }
    ];
  
    const id = this.id;
  
    // Find the first range where id is less than or equal to max
    const match = ranges.find(range => id < range.max);
  
    // Return the matching country code, or empty string if no match
    return match ? match.code : "";
  }

  exportToJSON() {
    // Recursively build a JSON-friendly structure for this node
    const nodeObject = {
      key: this.key,
      value: this.value,
      label: this.label,
      id: this.id,
      level: this.level,
      children: this.children.map((child) => child.exportToJSON()), // Export children recursively
    };
    return nodeObject;
  }

  static importFromJSON(jsonObject) {
    // Create a new TreeNode from the jsonObject
    const node = new TreeNode(jsonObject.key);
    // Recursively add children
    if (jsonObject.children) {
      for (const child of jsonObject.children) {
        const childNode = TreeNode.importFromJSON(child); // Import each child recursively
        node.addChild(childNode); // Add the child to the current node
      }
    }
    node.id = jsonObject.id;
    node.value = jsonObject.value;
    node.label = jsonObject.label;
    node.level = jsonObject.level;

    return node;
  }
}

export let dataStructure = TreeNode.importFromJSON(tree);
