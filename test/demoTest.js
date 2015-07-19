var chai = require('chai');
var expect = chai.expect;
var word = require('./demo.js');

describe('Sanitize',function(){
	before(function(){
		console.log('before!!!');
	});
	after(function(){
		console.log('after!!!');
	});

	it('return lower case',function(){
		var inputWord = 'Hello world';
		var outputWord = word.sanitize(inputWord);
		expect(outputWord).to.equal('hello world');
		expect(outputWord).to.not.equal('Hello World');
		expect(outputWord).to.be.a('string');
		expect(outputWord).to.not.be.a('number');
		expect(outputWord).to.contain('hello');

	});
	it('remove any hyphen',function(){
		
		var inputWord = 'Hello-world';
		var outputWord = word.sanitize(inputWord);

		expect(outputWord).to.equal('hello world');

	});
});