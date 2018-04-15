import Markdown, { MarkdownIt } from "markdown-it";

export class MarkdownLoader extends HTMLElement {

    private renderer: MarkdownIt;
    public path: string;

    constructor(path?: string) {
        super();
        this.attachShadow({ mode: "open" });

        this.renderer = new Markdown();
        this.path = path || this.getAttribute("path") || "../markdown/test.md";
    }

    connectedCallback() {
        this.renderMarkdown();
    }

    async renderMarkdown(): Promise<void> {
        try {
            let markdownRaw = await fetch(this.path);
            let markdown = await markdownRaw.text();

            let html = this.renderer.render(markdown);

            let shadow: ShadowRoot;
            if(!this.shadowRoot)
                shadow = this.attachShadow({ mode: "open" });
            else 
                shadow = this.shadowRoot;

            shadow.innerHTML = html;
        }

        catch {
            if(!this.shadowRoot)
                return;

            this.shadowRoot.innerHTML = `<p>Could not fetch markdown.</p>`;
        }
    }
}

customElements.define("markdown-loader", MarkdownLoader);