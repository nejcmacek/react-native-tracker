import { Admin2Page } from './app.po';

describe('admin2 App', () => {
  let page: Admin2Page;

  beforeEach(() => {
    page = new Admin2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
