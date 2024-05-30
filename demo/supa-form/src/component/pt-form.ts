import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import globalStyles from '../global.css?inline';

import { app } from '../app';
import './pt-form-page';

@customElement('pt-form')
class PtForm extends LitElement {
    @property()
    name?: string;

    @property({
        type: Object,
        converter: {
            fromAttribute: (value: string | null) => {
                if (value === null) return undefined;
                app.loadModel(value);
                return app.model;
            },
            toAttribute: (value: typeof app.model | undefined) => {
                if (value === undefined) return null;
                return app.stringifyModel(value);
            },
        },
    })
    config?: typeof app.model;

    render() {
        const pages = this.config?.contentPages ?? [];
        return html`${pages.map(
            (page) => html`<pt-form-page .name=${page.name}></pt-form-page>`
        )}`;
    }

    static styles = [
        unsafeCSS(globalStyles),
        css`
            :host {
                max-width: 1280px;
                margin: 0 auto;
                padding: 2rem;
                text-align: center;
            }
        `,
    ];
}
