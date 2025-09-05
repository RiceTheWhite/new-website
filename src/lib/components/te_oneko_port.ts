export function oneko() {
    let nekoDiv: HTMLDivElement = document.createElement("div");

    function init() {
        let style = nekoDiv.style;

        let nekoPos = {
            x: 0,
            y: 0
        }

        style.width = "32px"
        style.height = "32px"
        style.backgroundColor = "#ff0000"
        style.position = "fixed"
        style.imageRendering = "pixelated"
        style.left = `${nekoPos.x - 16}px`
        style.top = `${nekoPos.y - 16}px`
        style.zIndex = "10000000"

        document.appendChild(nekoDiv)

        document.addEventListener("mousemove", function (event) {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
        });

        window.requestAnimationFrame(onAnimationFrame);
    }
}