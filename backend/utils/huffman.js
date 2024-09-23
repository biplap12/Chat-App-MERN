class Node {
  constructor(character, frequency) {
      this.character = character;
      this.frequency = frequency;
      this.left = null;
      this.right = null;
  }
}

// Helper function to build frequency map
function buildFrequencyMap(str) {
  const frequencyMap = {};
  for (const char of str) {
      frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }
  return frequencyMap;
}

// Helper function to build Huffman Tree
function buildHuffmanTree(frequencyMap) {
  const nodes = Object.keys(frequencyMap).map(char => new Node(char, frequencyMap[char]));
  while (nodes.length > 1) {
      nodes.sort((a, b) => a.frequency - b.frequency);
      const left = nodes.shift();
      const right = nodes.shift();
      const newNode = new Node(null, left.frequency + right.frequency);
      newNode.left = left;
      newNode.right = right;
      nodes.push(newNode);
  }
  return nodes[0];
}

// Helper function to build Huffman codes
function buildHuffmanCodes(tree, prefix = '', codes = {}) {
  if (tree.character !== null) {
      codes[tree.character] = prefix;
  } else {
      buildHuffmanCodes(tree.left, prefix + '0', codes);
      buildHuffmanCodes(tree.right, prefix + '1', codes);
  }
  return codes;
}

// Function to encode message
function huffmanEncode(message) {
  const frequencyMap = buildFrequencyMap(message);
  const huffmanTree = buildHuffmanTree(frequencyMap);
  const huffmanCodes = buildHuffmanCodes(huffmanTree);

  let encodedMessage = '';
  for (const char of message) {
      encodedMessage += huffmanCodes[char];
  }
  return { encodedMessage, huffmanTree };
}

// Function to decode message
function huffmanDecode(encodedMessage, huffmanTree) {
  let decodedMessage = '';
  let currentNode = huffmanTree;
  for (const bit of encodedMessage) {
      currentNode = bit === '0' ? currentNode.left : currentNode.right;
      if (currentNode.character) {
          decodedMessage += currentNode.character;
          currentNode = huffmanTree;
      }
  }
  return decodedMessage;
}

export { buildHuffmanTree, huffmanEncode, huffmanDecode };
