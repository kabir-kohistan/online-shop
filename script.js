/* =========================================
   ELEMENTS
========================================= */

const scene =
    document.querySelector(".scene");

const heart =
    document.querySelector(".heart");

const orbitContainer =
    document.querySelector(".orbit-container");

const sparks =
    document.querySelector(".sparks");

const runner =
    document.querySelector(".runner");


/* =========================================
   SCREEN CENTER
========================================= */

let centerX =
    window.innerWidth / 2;

let centerY =
    window.innerHeight / 2;


/* =========================================
   HEART SCALE
========================================= */

function getHeartScale() {

    const width =
        window.innerWidth;

    const height =
        window.innerHeight;

    const smallest =
        Math.min(width, height);

    if (smallest < 500) {

        return smallest * 0.013;

    }

    return smallest * 0.015;

}


/* =========================================
   HEART EQUATION
========================================= */

function heartPoint(t) {

    const scale =
        getHeartScale();

    const x =
        16 *
        Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return {

        x: x * scale,

        y: -y * scale

    };

}


/* =========================================
   CREATE HEART PARTICLE
========================================= */

function createHeartParticle(
    index,
    total
) {

    const particle =
        document.createElement("span");

    particle.className =
        "particle";


    /* Heart position */

    const t =
        (Math.PI * 2 * index) /
        total;

    const point =
        heartPoint(t);


    /* Small randomness */

    const randomX =
        (Math.random() - .5) * 7;

    const randomY =
        (Math.random() - .5) * 7;


    const targetX =
        point.x + randomX;

    const targetY =
        point.y + randomY;


    /* Random starting position */

    const startX =
        Math.random() *
        window.innerWidth;

    const startY =
        Math.random() *
        window.innerHeight;


    particle.style.left =
        startX + "px";

    particle.style.top =
        startY + "px";


    /* Target movement */

    particle.style.setProperty(
        "--target-x",

        (
            centerX +
            targetX -
            startX
        ) + "px"
    );


    particle.style.setProperty(
        "--target-y",

        (
            centerY +
            targetY -
            startY
        ) + "px"
    );


    /* Floating */

    particle.style.setProperty(
        "--float-x",

        (
            Math.random() - .5
        ) * 5 + "px"
    );


    particle.style.setProperty(
        "--float-y",

        (
            Math.random() - .5
        ) * 5 + "px"
    );


    /* Random size */

    const size =
        2 +
        Math.random() * 2.5;


    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";


    /* Formation delay */

    particle.style.setProperty(
        "--form-delay",

        (
            index * 0.0035
        ) + "s"
    );


    /* Add */

    heart.appendChild(
        particle
    );

}


/* =========================================
   BUILD HEART
========================================= */

const totalParticles =
    window.innerWidth < 600
        ? 350
        : 650;


for (
    let i = 0;
    i < totalParticles;
    i++
) {

    createHeartParticle(
        i,
        totalParticles
    );

}


/* =========================================
   ORBIT PARTICLES
========================================= */

function createOrbitParticle() {

    const particle =
        document.createElement("span");

    particle.className =
        "orbit";


    /* Random angle */

    const angle =
        Math.random() * 360;


    /* Random radius */

    const radius =
        180 +
        Math.random() * 150;


    /* Random speed */

    const duration =
        8 +
        Math.random() * 8;


    /* Center */

    particle.style.left =
        centerX + "px";

    particle.style.top =
        centerY + "px";


    /* Variables */

    particle.style.setProperty(
        "--start-angle",

        angle + "deg"
    );


    particle.style.setProperty(
        "--orbit-radius",

        radius + "px"
    );


    particle.style.setProperty(
        "--orbit-duration",

        duration + "s"
    );


    /* Random start */

    particle.style.animationDelay =
        (
            Math.random() * 8
        ) + "s";


    orbitContainer.appendChild(
        particle
    );

}


/* =========================================
   BUILD ORBIT
========================================= */

const orbitCount =
    window.innerWidth < 600
        ? 20
        : 40;


for (
    let i = 0;
    i < orbitCount;
    i++
) {

    createOrbitParticle();

}


/* =========================================
   CREATE SPARK
========================================= */

function createSpark() {

    const spark =
        document.createElement("span");

    spark.className =
        "spark";


    /* Random point on heart */

    const angle =
        Math.random() *
        Math.PI *
        2;


    const point =
        heartPoint(angle);


    const startX =
        centerX +
        point.x;


    const startY =
        centerY +
        point.y;


    spark.style.left =
        startX + "px";

    spark.style.top =
        startY + "px";


    /* Random direction */

    const direction =
        Math.random() *
        Math.PI *
        2;


    /* Random distance */

    const distance =
        35 +
        Math.random() * 110;


    const moveX =
        Math.cos(direction) *
        distance;


    const moveY =
        Math.sin(direction) *
        distance;


    /* CSS variables */

    spark.style.setProperty(
        "--spark-x",

        moveX + "px"
    );


    spark.style.setProperty(
        "--spark-y",

        moveY + "px"
    );


    spark.style.setProperty(
        "--spark-time",

        (
            1.1 +
            Math.random() * 1.4
        ) + "s"
    );


    /* Add */

    sparks.appendChild(
        spark
    );


    /* Remove */

    setTimeout(() => {

        spark.remove();

    }, 2800);

}


/* =========================================
   SPARK LOOP
========================================= */

setInterval(() => {

    const amount =
        Math.random() > .65
            ? 2
            : 1;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        createSpark();

    }

}, 550);


/* =========================================
   HEART PATH
========================================= */

const runnerPoints = [];

const runnerSamples =
    1100;


for (
    let i = 0;
    i < runnerSamples;
    i++
) {

    const t =
        (
            Math.PI * 2 * i
        ) /
        runnerSamples;


    runnerPoints.push(
        heartPoint(t)
    );

}


/* =========================================
   LIGHT TRAIL
========================================= */

function createTrail(
    x,
    y
) {

    const trail =
        document.createElement("span");

    trail.className =
        "light-trail";


    trail.style.left =
        x + "px";

    trail.style.top =
        y + "px";


    trail.style.setProperty(
        "--trail-life",

        (
            .3 +
            Math.random() * .3
        ) + "s"
    );


    scene.appendChild(
        trail
    );


    setTimeout(() => {

        trail.remove();

    }, 800);

}


/* =========================================
   MOVING LIGHT
========================================= */

let runnerIndex = 0;

let runnerStarted =
    false;

let lastTrail = 0;


function animateRunner(time) {

    if (!runnerStarted) {

        requestAnimationFrame(
            animateRunner
        );

        return;

    }


    /* Current point */

    const point =
        runnerPoints[
            Math.floor(
                runnerIndex
            )
        ];


    /* Screen position */

    const x =
        centerX +
        point.x;


    const y =
        centerY +
        point.y;


    /* Move light */

    runner.style.left =
        x + "px";

    runner.style.top =
        y + "px";


    /* Trail */

    if (
        time -
        lastTrail >
        24
    ) {

        createTrail(
            x,
            y
        );

        lastTrail =
            time;

    }


    /* Speed */

    runnerIndex += 1.05;


    /* Restart */

    if (
        runnerIndex >=
        runnerPoints.length
    ) {

        runnerIndex = 0;

    }


    requestAnimationFrame(
        animateRunner
    );

}


/* =========================================
   START MOVING LIGHT
========================================= */

setTimeout(() => {

    runnerStarted =
        true;

    runner.classList.add(
        "active"
    );

}, 3500);


/* =========================================
   RESPONSIVE CENTER
========================================= */

window.addEventListener(
    "resize",
    () => {

        centerX =
            window.innerWidth / 2;

        centerY =
            window.innerHeight / 2;

    }
);


/* =========================================
   START
========================================= */

requestAnimationFrame(
    animateRunner
);