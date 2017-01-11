import { JobsFrontendPage } from './app.po';

describe('jobs-frontend App', function() {
  let page: JobsFrontendPage;

  beforeEach(() => {
    page = new JobsFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
