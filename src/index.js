/* eslint-disable no-console, no-param-reassign */
function insertNode(node, tree) {
  const len = tree.length;
  const weight = node[0];
  if (len === 0) {
    tree.push(node);
    return;
  }

  let left = 0;
  let right = len - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midWeight = tree[mid][0];

    if (weight > midWeight) {
      left = mid + 1;
    } else if (weight < midWeight) {
      right = mid - 1;
    } else {
      tree.splice(mid, 0, node);
      return;
    }
  }
  tree.splice(left, 0, node);
}
function createTree(freqs) {
  const sortedFreqs = freqs.map(val => val.slice())
    .map(val => val.reverse())
    .sort((a, b) => a[0] - b[0]);

  while (sortedFreqs.length > 1) {
    const a = sortedFreqs.shift();
    const b = sortedFreqs.shift();
    insertNode([(a[0] + b[0]), a, b], sortedFreqs);
  }
  return sortedFreqs[0];
}
function encodeTree(tree) {
  const encodeTreeIterator = (t, huf, str = '') => {
    if (typeof t[1] === 'string') {
      huf[t[1]] = str;
    } else {
      encodeTreeIterator(t[1], huf, `${str}0`);
      encodeTreeIterator(t[2], huf, `${str}1`);
    }
  };
  const huf = {};
  encodeTreeIterator(tree, huf);
  return huf;
}

// takes: String; returns: [ [String,Int] ] (Strings in return value are single characters)
function frequencies(s) {
  return s.split('').reduce((arr, char) => {
    if (arr.every(val => val[0] !== char)) {
      arr.push([char, s.match(new RegExp(char, 'ig')).length]);
    }
    return arr;
  }, []).sort();
}
// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
function encode(freqs, s) {
  if (freqs.length <= 1) return null;
  if (s.length === 0) return '';
  const tree = createTree(freqs);
  const huf = encodeTree(tree);
  return s.split('').map(char => huf[char]).join('');
}

// takes [ [String, Int] ], String (with "0" and "1"); returns: String
function decode(freqs, bits) {  // eslint-disable-line
  if (freqs.length <= 1) return null;
  const tree = createTree(freqs);
  const huf = encodeTree(tree);
  const bitsArray = bits.split('');
  let result = '';
  let testBits = '';
  while (bitsArray.length > 0) {
    testBits += bitsArray.shift();
    const char = Object.keys(huf).find(key => huf[key] === testBits); // eslint-disable-line no-loop-func
    if (char) {
      result += char;
      testBits = '';
    }
  }
  return result;
}

export {
  frequencies,
  encode,
  decode,
};
