import { vec3 } from "/lib/gl-matrix/index.js";

import { Shape } from "/gjk.js";
import { topRight, topLeft, botRight, botLeft, rectVerts, triVerts } from "/tests/constants.js";
import { assert, runTest } from "/tests/common.js";


function versorRad(rad) {
    return vec3.fromValues(Math.cos(rad), -Math.sin(rad), 0);
}
window.versor = versorRad;


function testCenter() {

    let a = new Shape([0, 0, 0], [1, 1, 1], rectVerts);

    let center = a.center();
    let expected = [.5, .5, 0];
    assert(
        vec3.equals(center, expected),
        "wrong center, expected: " + expected + " but got: " + center);
    
    a.rotation = Math.PI / 2;
    center = a.center();
    expected = [-.5, .5, 0];
    assert(
        vec3.equals(center, expected),
        "wrong center, expected: " + expected + " but got: " + center);

    a.rotation = Math.PI;
    center = a.center();
    expected = [-.5, -.5, 0];
    assert(
        vec3.equals(center, expected),
        "wrong center, expected: " + expected + " but got: " + center);

    a.rotation = (3 * Math.PI) / 2;
    center = a.center();
    expected = [.5, -.5, 0];
    assert(
        vec3.equals(center, expected),
        "wrong center, expected: " + expected + " but got: " + center);


}


runTest(testCenter, document.getElementById("label_test_center"));

function testSupports() {

    let a = new Shape([0, 0, 0], [1, 1, 1], rectVerts);

    let angle = Math.PI / 4;

    assert(
        vec3.equals(a.support(versorRad(angle)), topRight),
        "wrong support for topRight dir");
    
    assert(
        vec3.equals(a.support(versorRad(angle * 3)), topLeft),
        "wrong support for topLeft dir");

    assert(
        vec3.equals(a.support(versorRad(angle * 5)), botLeft),
        "wrong support for botLeft dir");
    
    assert(
        vec3.equals(a.support(versorRad(angle * 7)), botRight),
        "wrong support for botRight dir");

}


runTest(testSupports, document.getElementById("label_test_support"));


function testSupportsMoved() {

    let a = new Shape([10, 10, 0], [1, 1, 1], rectVerts);

    let angle = Math.PI / 4;

    let dirs = [
        versorRad(angle),
        versorRad(angle * 3),
        versorRad(angle * 5),
        versorRad(angle * 7)
    ];

    let movedVerts = [
        vec3.clone(topRight),
        vec3.clone(topLeft),
        vec3.clone(botLeft),
        vec3.clone(botRight)
    ];
    for (let i = 0; i < movedVerts.length; i++)
        vec3.add(movedVerts[i], movedVerts[i], a.pos);

    for (let i = 0; i < dirs.length; i++) {
        const supp = a.support(dirs[i]);
        assert(
            vec3.equals(supp, movedVerts[i]),
            "wrong moved support for index " + i + ": " + supp + " should be " + movedVerts[i]);
    }

}


runTest(testSupportsMoved, document.getElementById("label_test_support_moved"));


function testSupportsRotated() {
    let a = new Shape([0, 0, 0], [1, 1, 1], triVerts);

    a.rotation = Math.PI;
    
    let supp = a.support([0, 1, 0]);
    let target = [0, 2, 0];

    assert(
        vec3.equals(supp, target),
        "wrong rotated support for direction PI " + supp + " should be " + target);

    a.rotation = (3 * Math.PI) / 2;
    
    supp = a.support([-1, 0, 0]);
    target = [-2, 0, 0];

    assert(
        vec3.equals(supp, target),
        "wrong rotated support for direction PI " + supp + " should be " + target);
}

runTest(testSupportsRotated, document.getElementById("label_test_support_rotated"));


function testSupportsMovedRotated() {
    let a = new Shape([10, 10, 0], [1, 1, 1], triVerts);

    a.rotation = Math.PI;
    
    let supp = a.support([0, 1, 0]);
    let target = [0, 2, 0];
    vec3.add(target, target, a.pos);

    assert(
        vec3.equals(supp, target),
        "wrong rotated support for direction PI " + supp + " should be " + target);

    a.rotation = (3 * Math.PI) / 2;
    
    supp = a.support([-1, 0, 0]);
    target = [-2, 0, 0];
    vec3.add(target, target, a.pos);

    assert(
        vec3.equals(supp, target),
        "wrong rotated support for direction PI " + supp + " should be " + target);
}

runTest(testSupportsMovedRotated, document.getElementById("label_test_support_moved_rotated"));
