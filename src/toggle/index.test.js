require('expect-puppeteer')

beforeAll(async () => {
  await page.goto('http://localhost:3000')
})

describe('#toggle', () => {
  it('should toggle the input type', async () => {
    const button = await page.$('#toggle-button')
    const hidden = await page.$('#toggle-target')
    const classAttribute = c => c.getAttribute('class')

    expect(await hidden.evaluate(classAttribute)).toContain('hidden')
    await button.click()
    expect(await hidden.evaluate(classAttribute)).not.toContain('hidden')
  })
})
