"use strict";

//일정 범위 내 숫자 랜덤 출력
const getRandom = (min, max) => Math.random() * (max - min) + min;
window.onload = function init(){
    
    //지구, 달 객체 저장할 objects 배열
    const objects_1 = [];
    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //지구와 공전 중인 달 모델
    var system = new THREE.Object3D();
    scene.add(system);
    objects_1.push(system);

    //달 객체
    var moon_geo = new THREE.SphereGeometry(7,7,7);
    var moon_mat = new THREE.MeshBasicMaterial({color: 0xffff00});
    var moon = new THREE.Mesh(moon_geo, moon_mat);
    moon.position.z = 500;
    system.add(moon);
    objects_1.push(moon);

    //기준(지구) 객체
    var earth_geo = new THREE.SphereGeometry(1,1,1);
    var earth_mat = new THREE.MeshBasicMaterial({color: 0xffff00, opacity: 0.0, transparent: true}); //투명하게 조정
    var earth = new THREE.Mesh(earth_geo, earth_mat);
    system.add(earth);
    objects_1.push(earth);

    //지평선 객체
    var planeGeometry = new THREE.PlaneGeometry(200, 200);
    var planeMaterial = new THREE.MeshBasicMaterial({color:0x151212});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -5;
    scene.add(plane);
    
    //별 객체 저장할 objects 배열
    const objects_2 = [];
    const star = []; //랜덤 생성한 별 저장

    //별 일주 운동 모델
    var stars = new THREE.Object3D();
    scene.add(stars);
    objects_2.push(stars);

    //북극성(기준) 객체
    var pola_geo = new THREE.SphereGeometry(7,7,7);
    var pola_mat = new THREE.MeshBasicMaterial({color: 0xffffff});
    var pola = new THREE.Mesh(pola_geo, pola_mat);
    pola.position.y = 800;
    stars.add(pola);
    objects_2.push(pola);

    //랜덤한 위치에 별 1000개 생성
    for (var i = 0; i < 1000; i++){
        var star_geo = new THREE.SphereGeometry(1,1,1);
        var star_mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        var x = getRandom(-1000, 1000);
        var y = getRandom(-1000, 1000);
        var z = getRandom(-1000, 1000);
        star[i] = new THREE.Mesh(star_geo, star_mat);
        star[i].position.x = x;
        star[i].position.y = y;
        star[i].position.z = z;
        stars.add(star[i]);
        objects_2.push(star[i]);
    }

    //배경 - SKYBOX 텍스쳐 적용
    //오류 발생 - CORS 에러 발생
    /*
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        "./img/px.png", "./img/nx.png",
        "./img/py.png", "./img/ny.png",
        "./img/pz.png", "./img/nz.png"
    ]);
    scene.background = texture;
    */

    //마우스를 이용한 시점 변경
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set( 0, 10, 0 );
    controls.update();

    //렌더링 함수
    var render = function (time) {
        time *= 0.0001;
        objects_1.forEach((obj1) => {
            obj1.rotation.y = -time;
            obj1.rotation.x = -Math.PI/6;
        });
        objects_2.forEach((obj2) => {
            obj2.rotation.y = -time;
        });
        
        renderer.render(scene, camera);
        controls.update();

        requestAnimationFrame(render);
    };
    render();
}
