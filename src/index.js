/* eslint-disable no-console, no-param-reassign */
// takes: String; returns: [ [String,Int] ] (Strings in return value are single characters)
function frequencies(s) {
  return s.split('').reduce((arr, char) => {
    if (arr.every(val => val[0] !== char)) {
      arr.push([char, s.match(new RegExp(char, 'ig')).length]);
    }
    return arr;
  }, []).sort();
}
function binaryInsert(sub, bTree) {
  const len = bTree.length;
  const weight = sub[0];
  if (len === 0) {
    bTree.push(sub);
    return;
  }

  let left = 0;
  let right = len - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midWeight = bTree[mid][0];

    if (weight > midWeight) {
      left = mid + 1;
    } else if (weight < midWeight) {
      right = mid - 1;
    } else {
      bTree.splice(mid, 0, sub);
      return;
    }
  }

  bTree.splice(left, 0, sub);
}
function createTree(freqs) {
  const sortedFreqs = freqs.map(val => val.slice()).map(val => val.reverse()).sort((a, b) => a[0] - b[0]);
  while (sortedFreqs.length > 1) {
    const a = sortedFreqs.shift();
    const b = sortedFreqs.shift();
    binaryInsert([(a[0] + b[0]), a, b], sortedFreqs);
  }
  return sortedFreqs[0];
}
function encodeTreeIterator(tree, str, huf) {
  if (typeof tree[1] === 'string') {
    huf[tree[1]] = str;
  } else {
    encodeTreeIterator(tree[1], `${str}0`, huf);
    encodeTreeIterator(tree[2], `${str}1`, huf);
  }
}
function encodeTree(tree) {
  const huf = {};
  encodeTreeIterator(tree, '', huf);
  return huf;
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
  let result = '';
  bits.split('').reduce((val, next) => {
    for (const key in huf) { // eslint-disable-line
      if (huf[key] === val + next) {
        result += key;
        return '';
      } else if (huf[key] === val) {
        result += key;
        return next;
      }
    }
    return val + next;
  }, '');
  return result;
}

export {
  frequencies,
  encode,
  decode,
};
