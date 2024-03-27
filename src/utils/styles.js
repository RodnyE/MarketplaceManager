
/**
 * Inyect a css code fast without a css external file
 * 
 * @param {string} css
 */
export const insertStyles = (css) => {
    let head = document.querySelector("head");
    let style = document.createElement("style");
    
    style.innerText = css;
    
    head.appendChild(style);
}