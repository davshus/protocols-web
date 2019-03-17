function createRange(node, start, length) {
    let range = document.createRange();
    range.setStart(node, start);
    range.setStart(node, start + length);
    return range;
}