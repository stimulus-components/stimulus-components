require('expect-puppeteer')

beforeAll(async () => {
  await page.goto('http://localhost:3000')
})

describe('#checkboxSelectAll', () => {
  it('should select all checkboxes', async () => {
    const toggleCheckbox = await page.$('#checkbox-select-all')
    const targetsBefore = await page.evaluate(
      () => document.querySelectorAll("[data-target='checkbox-select-all.checkbox']:checked").length
    )

    expect(targetsBefore).toBe(0)

    await toggleCheckbox.click()

    const targetsAfter = await page.evaluate(
      () => document.querySelectorAll("[data-target='checkbox-select-all.checkbox']:checked").length
    )

    expect(targetsAfter).toBe(3)
  })
})
