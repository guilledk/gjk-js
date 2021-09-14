import { vec3 } from "/lib/gl-matrix/index.js";

import { Shape, GJKContext } from "/gjk.js";
import { rectVerts, triVerts } from "/tests/constants.js";
import { assert, runTest } from "/tests/common.js";


function testRectTrue() {

    let a = new Shape([0, 0, 0], [1, 1, 1], rectVerts);
    let b = new Shape([0.5, 0.5, 0], [1, 1, 1], rectVerts);

    const ctx = new GJKContext(a, b);

    assert(ctx.performTest(), "failed gjk collision test");
}


runTest(testRectTrue, document.getElementById("label_test_gjk_rect_true"));


function testRectFalse() {

    let a = new Shape([0, 0, 0], [1, 1, 1], rectVerts);
    let b = new Shape([1.1, 1.1, 0], [1, 1, 1], rectVerts);

    const ctx = new GJKContext(a, b);

    assert(!ctx.performTest(), "passed gjk collision test");
}


runTest(testRectFalse, document.getElementById("label_test_gjk_rect_false"));


function testTriangleTrue() {

    let a = new Shape([0, 0, 0], [1, 1, 1], triVerts);
    let b = new Shape([0, -2, 0], [1, 1, 1], triVerts);

    const ctx = new GJKContext(a, b);

    assert(ctx.performTest(), "failed gjk collision test");

}

runTest(testTriangleTrue, document.getElementById("label_test_gjk_tri_true"));


function testTriangleFalse() {

    let a = new Shape([0, 0, 0], [1, 1, 1], triVerts);
    let b = new Shape([0, -3.1, 0], [1, 1, 1], triVerts);

    const ctx = new GJKContext(a, b);

    assert(!ctx.performTest(), "passed gjk collision test");

}

runTest(testTriangleTrue, document.getElementById("label_test_gjk_tri_false"));


function testTriangleRotatedTrue() {

    let a = new Shape([0, 0, 0], [1, 1, 1], triVerts);
    let b = new Shape([2.5, 0, 0], [1, 1, 1], triVerts);

    b.rotation = (3 * Math.PI) / 2;

    const ctx = new GJKContext(a, b);

    assert(ctx.performTest(), "failed gjk collision test");

}

runTest(testTriangleRotatedTrue, document.getElementById("label_test_gjk_tri_rot_true"));


function testTriangleRotatedFalse() {

    let a = new Shape([0, -1.05, 0], [1, 1, 1], triVerts);
    let b = new Shape([0, 1.05, 0], [1, 1, 1], triVerts);

    b.rotation = Math.PI;

    assert(!(new GJKContext(a, b).performTest()), "passed gjk collision test");
    
    a = new Shape([0,    0, 0], [1, 1, 1], triVerts);
    b = new Shape([1.1, -1, 0], [1, 1, 1], triVerts);

    b.rotation = Math.PI;

    console.log(a.vertices());
    console.log(b.vertices());

    assert(!(new GJKContext(a, b).performTest()), "passed gjk collision test");

}

runTest(testTriangleRotatedFalse, document.getElementById("label_test_gjk_tri_rot_false"));
