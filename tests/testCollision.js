import { vec3 } from "../lib/gl-matrix/index.js";

import { Shape, GJKContext } from "../gjk.js";
import { rectVerts, triVerts } from "./constants.js";
import { assert, runTest } from "./common.js";


function testRectTrue() {

    let a = new Shape([0, 0, 0], [1, 1, 1], rectVerts);
    let b = new Shape([0.5, 0.5, 0], [1, 1, 1], rectVerts);

    const ctx = new GJKContext(a, b);

    assert(ctx.performTest(), "failed gjk collision test");
}


function testRectFalse() {

    let a = new Shape([0, 0, 0], [1, 1, 1], rectVerts);
    let b = new Shape([1.1, 1.1, 0], [1, 1, 1], rectVerts);

    const ctx = new GJKContext(a, b);

    assert(!ctx.performTest(), "passed gjk collision test");
}


function testTriangleTrue() {

    let a = new Shape([0, 0, 0], [1, 1, 1], triVerts);
    let b = new Shape([0, -2, 0], [1, 1, 1], triVerts);

    const ctx = new GJKContext(a, b);

    assert(ctx.performTest(), "failed gjk collision test");

}


function testTriangleFalse() {

    let a = new Shape([0, 0, 0], [1, 1, 1], triVerts);
    let b = new Shape([0, -3.1, 0], [1, 1, 1], triVerts);

    const ctx = new GJKContext(a, b);

    assert(!ctx.performTest(), "passed gjk collision test");

}


function testTriangleRotatedTrue() {

    let a = new Shape([0, 0, 0], [1, 1, 1], triVerts);
    let b = new Shape([2.5, 0, 0], [1, 1, 1], triVerts);

    b.rotation = (3 * Math.PI) / 2;

    const ctx = new GJKContext(a, b);

    assert(ctx.performTest(), "failed gjk collision test");

}


function testTriangleRotatedFalse() {

    let a = new Shape([0, -1.05, 0], [1, 1, 1], triVerts);
    let b = new Shape([0, 1.05, 0], [1, 1, 1], triVerts);

    b.rotation = Math.PI;

    assert(!(new GJKContext(a, b).performTest()), "passed gjk collision test");
    
    a = new Shape([0, 0, 0], [1, 1, 1], triVerts);
    b = new Shape([1.1, -1, 0], [1, 1, 1], triVerts);

    b.rotation = Math.PI;

    assert(!(new GJKContext(a, b).performTest()), "passed gjk collision test");

}


runTest(testRectTrue);
runTest(testRectFalse);
runTest(testTriangleTrue);
runTest(testTriangleFalse);
runTest(testTriangleRotatedTrue);
runTest(testTriangleRotatedFalse);
