/* eslint-disable no-unused-vars */
import { expect } from 'chai';
import { frequencies, encode, decode } from './index';

describe('Huffman Encoding', () => {
  let s = '';
  let fs = [];
  let bits = '';
  describe('Encode aaaabcc string', () => {
    beforeEach(() => {
      s = 'aaaabcc';
      fs = frequencies(s);
      bits = encode(fs, s);
    });
    it('should return all frequencies', () => {
      const result = [['a', 4], ['b', 1], ['c', 2]];
      expect([...fs].sort()).to.be.eql(result);
    });
    it('should encoded string length to be 10', () => {
      expect(bits.length).to.be.eql(10);
    });
    it('should encoded string value to be 1111000101', () => {
      expect(bits).to.be.eql('1111000101');
    });
    it('should decoded string be aaaabcc', () => {
      expect(decode(fs, bits)).to.be.eql(s);
    });
  });
  describe('Encode aaaab string', () => {
    beforeEach(() => {
      s = 'aaaab';
      fs = frequencies(s);
      bits = encode(fs, s);
    });
    it('should encoded string value to be 1111000101', () => {
      expect(encode(fs, s)).to.be.eql('11110');
    });
    it('should encoded string length be 10', () => {
      expect(bits.length).to.be.eql(5);
    });
    it('should decoded string be aaaab', () => {
      expect(decode(fs, bits)).to.be.eql(s);
    });
  });
  describe('Encode hallo string', () => {
    beforeEach(() => {
      s = 'hallo';
      fs = frequencies(s);
      bits = encode(fs, s);
    });
    it('should encoded string value to be 1111100010', () => {
      expect(bits).to.be.eql('1111100010');
    });
    it('should encoded string length be 10', () => {
      expect(bits.length).to.be.eql(10);
    });
    it('should decoded string be hallo', () => {
      expect(decode(fs, bits)).to.be.eql(s);
    });
  });
  describe('Encode string "My Name is John"', () => {
    beforeEach(() => {
      s = 'My Name is John';
      fs = frequencies(s);
      bits = encode(fs, s);
    });
    it('should encoded string value to be 1111001111011100100101010111001111000110011010010010000', () => {
      expect(bits).to.be.eql('1111001111011100100101010111001111000110011010010010000');
    });
    it('should encoded string length be 10', () => {
      expect(bits.length).to.be.eql(55);
    });
    it('should decoded string be "My Name is John"', () => {
      expect(decode(fs, bits)).to.be.eql(s);
    });
  });
});
