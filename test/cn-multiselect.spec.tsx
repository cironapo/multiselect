import { newSpecPage } from '@stencil/core/testing';
import { CnMultiselect } from '../cn-multiselect';

describe('cn-multiselect', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CnMultiselect],
      html: `<cn-multiselect></cn-multiselect>`,
    });
    expect(page.root).toEqualHtml(`
      <cn-multiselect>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cn-multiselect>
    `);
  });
});
