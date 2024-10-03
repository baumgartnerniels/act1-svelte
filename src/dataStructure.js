import tree from "../data/app_data_structure.json";

class TreeNode {
  constructor(key) {
    this.key = key;
    this.children = [];
    this.parent = null;
  }

  // Method to add a child to the current node
  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  findNode(key) {
    if (this.key === key) {
      return this; // Found the node
    }
    for (const child of this.children) {
      const result = child.findNode(key);
      if (result) {
        return result; // Recursively search in children
      }
    }
    return null; // Node not found
  }

  // Method to check if the current node is a child of another node with a given key
  isChildOf(key) {
    let currentNode = this.parent; // Start from the parent
    while (currentNode) {
      if (currentNode.key === key) {
        return true; // Found the parent
      }
      currentNode = currentNode.parent; // Move up the tree
    }
    return false; // Parent not found
  }

  // Method to check if the current node is a parent of a node with a given key
  isParentOf(key) {
    return this.findNode(key) !== null; // Use findNode to check if the child exists in this subtree
  }

  isRelated(key) {
    return this.getRelatedNodes().includes(key);
  }

  isRelatedToAny(list, key) {
    let related = false;
    list.forEach((e) => {
      if (this.findNode(e).isRelated(key)) {
        related = true;
      }
    });
    return related;
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
    return relatedNodes.map((node) => node.key); // Return the list of keys (optional)
  }

  exportToJSON() {
    // Recursively build a JSON-friendly structure for this node
    const nodeObject = {
      key: this.key,
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
    return node;
  }
}

export let dataStructure = TreeNode.importFromJSON(tree);
