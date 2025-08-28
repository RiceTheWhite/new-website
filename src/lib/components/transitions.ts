export function typewriter(node: { childNodes: any; textContent: any; }, { speed = 2 }: any) {
    const valid =
        node.childNodes.length === 1 &&
        node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
        throw new Error(
            `This transition only works on elements with a single text node child`
        );
    }

    const text = node.textContent;
    const duration = text.length / (speed * 0.01);

    return {
        duration,
        tick: (t: number) => {
            const i = Math.trunc(text.length * t);
            node.textContent = text.slice(0, i);
        },
    };
}

export function select(node: HTMLElement, { duration = 150 }) {
    const text = node.textContent || "";
    const len = text.length;
    const originalColor = getComputedStyle(node).color;

    return {
        duration,
        tick: (t: any) => {
            node.style.color = "#fff";
            node.style.backgroundColor = originalColor;
        },
    };
}
