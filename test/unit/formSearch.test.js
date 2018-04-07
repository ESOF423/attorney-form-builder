const puppeteer = require('puppeteer')
const faker = require('faker')
const { expect } = require('chai')

//server address
const server = 'http://server.redstonelab.net:8080'

var browser;
var page;
before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
})

after(async () => {
    await browser.close();
})

describe('formSearch test', async () => {
    it('should find', async () => {
        await page.goto('${server}/formSearch')
        await page.name('#name','Will')
        await page.attorney('#attorney','Bill Waterson')
        await page.cost('4')
        
        var successText = await page.$eval("#successText", el => el.innerHTML);

    expect(successText).to.equal("Success")
    }).timeout(10000);
})

describe('invalid attorny test', async () => {
    it('should not find', async () => {
        await page.goto('${server}/formSearch')
        await page.name('#name', 'Will')
        await page.name('#attorney', 'invalid')
        await page.cost('4')

        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal("No forms for submitted attorney")
    }).timeout(10000);
})

describe('invalid name test', async () => {
    it('should not find', async () => {
        await page.goto('${server}/formSearch')
        await page.name('#name', 'invalid')
        await page.name('#attorney', 'Bill Waterson')
        await page.cost('4')

        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal("Invalid form name")
    }).timeout(10000);
})

describe('invalid cost test', async () => {
    it('should not find', async () => {
        await page.goto('${server}/formSearch')
        await page.name('#name', 'Will')
        await page.name('#attorney', 'Legal Beagle')
        await page.cost('invalid')

        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal("Invalid form cost")
    }).timeout(10000);
})
