const puppeteer = require('puppeteer');
const faker = require('faker');
const papel = require('papel');
const { expect } = require('chai');

var browser;
var page;
var latex;
before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    latex = await papel.getUserForms();
})

after(async () => {
    await browser.close();
})

describe('user tests', async () => {
    it('should login', async () => {
        var pass = faker.internet.password()

        await page.goto(`${server}/login`)
        await page.type('#email', faker.internet.email())
        await page.type('#password', password)

        await page.click('#login input[type=submit]')
        await page.waitFor(1000)
    
        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal("")
    }).timeout(10000);

    it('should not login', async () => {
        await page.goto('${server}/login')
        await page.type('#email', faker.internet.email())
        await page.type('#password', faker.internet.password())
        await page.click('#login input[type=submit]')
        
        await page.waitFor(1000)

        var successText = await page.$eval("#successText", el => el.innerHTML);

        expect(errorText).to.equal(" ")
    }).timeout(10000);

    it('should purchase form', async () => {
        await page.goto('${server}/purchaseForm?formId=1')
        await page.type('#getUserFormAnswers', faker.getUserFormAnswers())
        await page.type('#getForm', faker.getForm())
        await page.click('#createUserForm input[type=submit]')
       
        await page.waitFor(1000)

        var errorText = await page.$eval("#errorText", el => el.innerHTML);

        expect(errorText).to.equal(" ")
    }).timeout(10000);

    it('should not purchase form', async () => {
        await page.goto('${server}/purchaseForm?formId=1')
        await page.type('#getUserFormAnswers', faker.getUserFormAnswers())
        await page.type('#getForm', faker.getForm())
        await page.click('#createUserForm input[type=submit]')

        await page.waitFor(1000)

        var successText = await page.$eval("#successText", el => el.innerHTML);

        expect(successText).to.equal(" ")
    }).timeout(10000);
    
    
    it('should download form', async () => {
        await page.goto('${server}/dowloadForm')
        await page.type('#userId', faker.userId())
        await page.type('#userFormId', faker.userFormId())
        await page.click('#downloadForm, input[type=submit]')

        await page.waitFor(1000)

        var errorText = await page.$eval("#errorText", el => el.innerHTML);
        expect(errorText).to.equal(" ")
    }).timeout(10000);

    it('should not download form', async () => {
        await page.got('${server}/downloadForm')
        await page.type('#userId', faker.userId())
        await page.type('#userFormId', faker.userFormId())
        await page.click('#downloadForm, input[type=submit]')

        await page.waitFor(1000)

        var successText = await page.$eval("#successText", el => el.innerHTML);
        expect(successText).to.equal(" ")
    }).timeout(10000);
    
    });