const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const NODE_RADIUS = 2;
const CANVAS_WIDTH = 300;
const DEPTH = 4;

drawBinaryTree(CANVAS_WIDTH / 2, NODE_RADIUS * 2, DEPTH);

// Draw a binary tree dynamically depending on depth
function drawBinaryTree(x, y, depth) {
    const root = node(x, y);

    context.fill(root);

    if (depth > 0) {
        const leftChildXCoord = x - NODE_RADIUS * Math.pow(2, depth + 1);
        const rightChildXCoord = x + NODE_RADIUS * Math.pow(2, depth + 1);
        const childYCoord = y + NODE_RADIUS * depth * 5;

        const leftEdge = edge(x, y, leftChildXCoord, childYCoord);
        const rightEdge = edge(x, y, rightChildXCoord, childYCoord);

        context.stroke(leftEdge);
        context.stroke(rightEdge);

        drawBinaryTree(leftChildXCoord, childYCoord, depth - 1);
        drawBinaryTree(rightChildXCoord, childYCoord, depth - 1);
    }
}

// Draw a line from (xStart, yStart) to (xEnd, yEnd)
function edge(xStart, yStart, xEnd, yEnd) {
    const line = new Path2D();

    line.moveTo(xStart, yStart);
    line.lineTo(xEnd, yEnd);

    return line;
}

// Draw a circle denoting a node
function node(x, y) {
    const shape = new Path2D();

    shape.arc(x, y, NODE_RADIUS, 0, 2 * Math.PI);

    return shape;
}