var sceneWidth;
var sceneHeight;
var camera;
var scene;
var renderer;
var rollingGroundSphere;
var heroSphere;
var rollingSpeed=0.009;
var heroRollingSpeed;
var worldRadius=26;
var heroRadius=0.2;
var sphericalHelper;
var pathAngleValues;
var heroBaseY=1.8;
var bounceValue=0.09;
var leftLane=-1;
var rightLane=1;
var middleLane=0;
var currentLane;
var clock;
var jumping;
var treesInPath;
var treesPool;
var particleGeometry;
var particleCount=20;
var explosionPower =1.06;
var particles;
var scoreText;
var scoreValue;
var hasCollided;
var TO_RADIANS = Math.PI / 180;
var snowParticles;
var mySound;

window.addEventListener('load', init, false);

//functions to create snowflakes
Particle3D = function(material) {
		THREE.Sprite.call(this, material);
		this.velocity = new THREE.Vector3(0, -8, 0);
		this.velocity.rotateX(randomRange(-45, 45));
		this.velocity.rotateY(randomRange(0, 360));
		this.gravity = new THREE.Vector3(0, 0, 0);
		this.drag = 1;
};

Particle3D.prototype = new THREE.Sprite();
Particle3D.prototype.constructor = Particle3D;

Particle3D.prototype.updatePhysics = function() {
		this.velocity.multiplyScalar(this.drag);
		this.velocity.add(this.gravity);
		this.position.add(this.velocity);
}

THREE.Vector3.prototype.rotateY = function(angle) {
		cosRY = Math.cos(angle * TO_RADIANS);
		sinRY = Math.sin(angle * TO_RADIANS);

		var tempz = this.z;;
		var tempx = this.x;

		this.x = (tempx * cosRY) + (tempz * sinRY);
		this.z = (tempx * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateX = function(angle) {
		cosRY = Math.cos(angle * TO_RADIANS);
		sinRY = Math.sin(angle * TO_RADIANS);

		var tempz = this.z;;
		var tempy = this.y;

		this.y = (tempy * cosRY) + (tempz * sinRY);
		this.z = (tempy * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateZ = function(angle) {
		cosRY = Math.cos(angle * TO_RADIANS);
		sinRY = Math.sin(angle * TO_RADIANS);

		var tempx = this.x;;
		var tempy = this.y;

		this.y = (tempy * cosRY) + (tempx * sinRY);
		this.x = (tempy * -sinRY) + (tempx * cosRY);
}

function randomRange(min, max) {
		return ((Math.random() * (max - min)) + min);
}

function init() {
	// set up the scene
	hasCollided=false;
	scoreValue=0;
	treesInPath=[];
	treesPool=[];
	snowParticles=[];
	clock=new THREE.Clock();
	clock.start();
	mySound = new sound("snowHits.mp3");
	document.getElementById("background music").play();
	heroRollingSpeed=(rollingSpeed*worldRadius/heroRadius)/5;
	sphericalHelper = new THREE.Spherical();
	pathAngleValues=[1.52,1.57,1.62];
	sceneWidth=window.innerWidth;
  sceneHeight=window.innerHeight;
  scene = new THREE.Scene();//the 3d scene
  scene.fog = new THREE.FogExp2( 0xf0fff0, 0.14 );
  camera = new THREE.PerspectiveCamera( 60, sceneWidth / sceneHeight, 0.1, 1000 );//perspective camera
  renderer = new THREE.WebGLRenderer({alpha:true});//renderer with transparent backdrop
  renderer.setClearColor(0x4e534e, 1);
  renderer.shadowMap.enabled = true;//enable shadow
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize( sceneWidth, sceneHeight );
  var container = document.getElementById('container');
	//create snowflakes
	var material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load('http://i.imgur.com/cTALZ.png') } );
	for (var i = 0; i < 500; i++) {
		var particle = new Particle3D( material);
		particle.position.x = Math.random() * 2000 - 1000;
		particle.position.y = Math.random() * 2000 - 1000;
		particle.position.z = Math.random() * 2000 - 1000;
		particle.scale.x = 22;
		particle.scale.y = 22;
		scene.add( particle );
		snowParticles.push(particle);
	}
	container.appendChild(renderer.domElement);
	setInterval(loop, 1000 / 60);
	createTreesPool();
	addComponents();
	addExplosion();
	camera.position.z = 6.5;
	camera.position.y = 3.5;
	var orbitControl = new THREE.OrbitControls( camera, renderer.domElement );//helper to rotate around in scene
	orbitControl.addEventListener( 'change', render );
	orbitControl.noKeys = true;
	orbitControl.noPan = true;
	orbitControl.enableZoom = false;
	orbitControl.minPolarAngle = 1.1;
	orbitControl.maxPolarAngle = 1.1;
	orbitControl.minAzimuthAngle = -0.2;
	orbitControl.maxAzimuthAngle = 0.2;
	document.onkeydown = handleKeyDown;

	scoreText = document.createElement('div');
	scoreText.style.position = 'absolute';
	scoreText.style.width = 100;
	scoreText.style.height = 100;
	scoreText.style.color="white";
	scoreText.style.fontSize= 50+'px';
	scoreText.innerHTML = "0";
	scoreText.style.top = 10 + 'px';
	scoreText.style.left = 100 + 'px';

	var scoreDisplay=document.createElement('div');
	scoreDisplay.style.position='absolute';
	scoreDisplay.style.width=100;
	scoreDisplay.style.height=100;
	scoreDisplay.style.color="white";
	scoreDisplay.style.fontSize= 25+'px';
	scoreDisplay.style.top = 10 + 'px';
	scoreDisplay.style.left = 10 + 'px';
	scoreDisplay.innerHTML="Score:";
	document.body.appendChild(scoreText);
	document.body.appendChild(scoreDisplay);
	//call game loop
	update();
}

//given in tut
function createTree(){
	var sides=8;
	var tiers=6;
	var scalarMultiplier=(Math.random()*(0.25-0.1))+0.05;
	var midPointVector= new THREE.Vector3();
	var vertexVector= new THREE.Vector3();
	var treeGeometry = new THREE.ConeGeometry( 0.5, 1, sides, tiers);
	var treeMaterial = new THREE.MeshStandardMaterial( { color: 0x33ff33,shading:THREE.FlatShading  } );
	var offset;
	midPointVector=treeGeometry.vertices[0].clone();
	var currentTier=0;
	var vertexIndex;
	blowUpTree(treeGeometry.vertices,sides,0,scalarMultiplier);
	tightenTree(treeGeometry.vertices,sides,1);
	blowUpTree(treeGeometry.vertices,sides,2,scalarMultiplier*1.1,true);
	tightenTree(treeGeometry.vertices,sides,3);
	blowUpTree(treeGeometry.vertices,sides,4,scalarMultiplier*1.2);
	tightenTree(treeGeometry.vertices,sides,5);
	var treeTop = new THREE.Mesh( treeGeometry, treeMaterial );
	treeTop.castShadow=true;
	treeTop.receiveShadow=false;
	treeTop.position.y=0.9;
	treeTop.rotation.y=(Math.random()*(Math.PI));
	var treeTrunkGeometry = new THREE.CylinderGeometry( 0.1, 0.1,0.5);
	var trunkMaterial = new THREE.MeshStandardMaterial( { color: 0x886633,shading:THREE.FlatShading  } );
	var treeTrunk = new THREE.Mesh( treeTrunkGeometry, trunkMaterial );
	treeTrunk.position.y=0.25;
	var tree =new THREE.Object3D();
	tree.add(treeTrunk);
	tree.add(treeTop);
	return tree;
}
//given in tut
function blowUpTree(vertices,sides,currentTier,scalarMultiplier,odd){
	var vertexIndex;
	var vertexVector= new THREE.Vector3();
	var midPointVector=vertices[0].clone();
	var offset;
	for(var i=0;i<sides;i++){
		vertexIndex=(currentTier*sides)+1;
		vertexVector=vertices[i+vertexIndex].clone();
		midPointVector.y=vertexVector.y;
		offset=vertexVector.sub(midPointVector);
		if(odd){
			if(i%2===0){
				offset.normalize().multiplyScalar(scalarMultiplier/6);
				vertices[i+vertexIndex].add(offset);
			}else{
				offset.normalize().multiplyScalar(scalarMultiplier);
				vertices[i+vertexIndex].add(offset);
				vertices[i+vertexIndex].y=vertices[i+vertexIndex+sides].y+0.05;
			}
		}else{
			if(i%2!==0){
				offset.normalize().multiplyScalar(scalarMultiplier/6);
				vertices[i+vertexIndex].add(offset);
			}else{
				offset.normalize().multiplyScalar(scalarMultiplier);
				vertices[i+vertexIndex].add(offset);
				vertices[i+vertexIndex].y=vertices[i+vertexIndex+sides].y+0.05;
			}
		}
	}
}

//given in tut
function tightenTree(vertices,sides,currentTier){
	var vertexIndex;
	var vertexVector= new THREE.Vector3();
	var midPointVector=vertices[0].clone();
	var offset;
	for(var i=0;i<sides;i++){
		vertexIndex=(currentTier*sides)+1;
		vertexVector=vertices[i+vertexIndex].clone();
		midPointVector.y=vertexVector.y;
		offset=vertexVector.sub(midPointVector);
		offset.normalize().multiplyScalar(0.06);
		vertices[i+vertexIndex].sub(offset);
	}
}


function addComponents(){
	var sides=40;
	var tiers=40;
	var sphereGeometry = new THREE.SphereGeometry( worldRadius, sides,tiers);
	var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xfffafa ,shading:THREE.FlatShading} )
	var vertexIndex;
	var vertexVector= new THREE.Vector3();
	var nextVertexVector= new THREE.Vector3();
	var firstVertexVector= new THREE.Vector3();
	var offset= new THREE.Vector3();
	var currentTier=1;
	var lerpValue=0.5;
	var heightValue;
	var maxHeight=0.07;
	for(var j=1;j<tiers-2;j++){
		currentTier=j;
		for(var i=0;i<sides;i++){
			vertexIndex=(currentTier*sides)+1;
			vertexVector=sphereGeometry.vertices[i+vertexIndex].clone();
			if(j%2!==0){
				if(i==0){
					firstVertexVector=vertexVector.clone();
				}
				nextVertexVector=sphereGeometry.vertices[i+vertexIndex+1].clone();
				if(i==sides-1){
					nextVertexVector=firstVertexVector;
				}
				lerpValue=(Math.random()*(0.75-0.25))+0.25;
				vertexVector.lerp(nextVertexVector,lerpValue);
			}
			heightValue=(Math.random()*maxHeight)-(maxHeight/2);
			offset=vertexVector.clone().normalize().multiplyScalar(heightValue);
			sphereGeometry.vertices[i+vertexIndex]=(vertexVector.add(offset));
		}
	}
	rollingGroundSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	rollingGroundSphere.receiveShadow = true;
	rollingGroundSphere.castShadow=false;
	rollingGroundSphere.rotation.z=-Math.PI/2;
	scene.add( rollingGroundSphere );
	rollingGroundSphere.position.y=-24;
	rollingGroundSphere.position.z=2;
	addWorldTrees();
	//create the snowball
	var sphereGeometry = new THREE.DodecahedronGeometry( heroRadius, 1);
	var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xe5f2f2 ,shading:THREE.FlatShading} )
	jumping=false;
	heroSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	heroSphere.receiveShadow = true;
	heroSphere.castShadow=true;
	scene.add( heroSphere );
	heroSphere.position.y=heroBaseY;
	heroSphere.position.z=4.8;
	currentLane=middleLane;
	heroSphere.position.x=currentLane;
	//create shadows
	var hemisphereLight = new THREE.HemisphereLight(0xfffafa,0x000000, .9)
	scene.add(hemisphereLight);
	var sun = new THREE.DirectionalLight( 0xcdc1c5, 0.9);
	sun.position.set( 12,6,-7 );
	sun.castShadow = true;
	scene.add(sun);
	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50 ;
}

//given in tut
function addExplosion(){
	particleGeometry = new THREE.Geometry();
	for (var i = 0; i < particleCount; i ++ ) {
		var vertex = new THREE.Vector3();
		particleGeometry.vertices.push( vertex );
	}
	var pMaterial = new THREE.ParticleBasicMaterial({
	  color: 0xfffafa,
	  size: 0.2
	});
	particles = new THREE.Points( particleGeometry, pMaterial );
	scene.add( particles );
	particles.visible=false;
}

//given in tut
function explode(){
	particles.position.y=2;
	particles.position.z=4.8;
	particles.position.x=heroSphere.position.x;
	for (var i = 0; i < particleCount; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = -0.2+Math.random() * 0.4;
		vertex.y = -0.2+Math.random() * 0.4 ;
		vertex.z = -0.2+Math.random() * 0.4;
		particleGeometry.vertices[i]=vertex;
	}
	explosionPower=1.07;
	particles.visible=true;
}

//given in tut
function doExplosionLogic(){
	if(!particles.visible)return;
	for (var i = 0; i < particleCount; i ++ ) {
		particleGeometry.vertices[i].multiplyScalar(explosionPower);
	}
	if(explosionPower>1.005){
		explosionPower-=0.001;
	}else{
		particles.visible=false;
	}
	particleGeometry.verticesNeedUpdate = true;
}

//given in tut
function update(){
	var gravity=0.005;
	var treeReleaseInterval=0.5;
	rollingGroundSphere.rotation.x += rollingSpeed;
  heroSphere.rotation.x -= heroRollingSpeed;
  if(heroSphere.position.y<=heroBaseY){
  	jumping=false;
  	bounceValue=(Math.random()*0.04)+0.005;
  }
  heroSphere.position.y+=bounceValue;
  heroSphere.position.x=THREE.Math.lerp(heroSphere.position.x,currentLane, 2*clock.getDelta());
  bounceValue-=gravity;
  if(clock.getElapsedTime()>treeReleaseInterval){
  	clock.start();
  	addPathTree();
  	if(!hasCollided){
			scoreValue+=2*treeReleaseInterval;
			scoreText.innerHTML=scoreValue.toString();
		}
  }
  doTreeLogic();
  doExplosionLogic();
  render();
	requestAnimationFrame(update);
}

//given in tut
function render(){
    renderer.render(scene, camera);
}

//given in tut
function addWorldTrees(){
	var numTrees=36;
	var gap=6.28/36;
	for(var i=0;i<numTrees;i++){
		addTree(false,i*gap, true);
		addTree(false,i*gap, false);
	}
}


//given in tut
function addTree(inPath, row, isLeft){
	var newTree;
	if(inPath){
		if(treesPool.length==0)return;
		newTree=treesPool.pop();
		newTree.visible=true;
		treesInPath.push(newTree);
		sphericalHelper.set( worldRadius-0.3, pathAngleValues[row], -rollingGroundSphere.rotation.x+4 );
	}else{
		newTree=createTree();
		var forestAreaAngle=0;
		if(isLeft){
			forestAreaAngle=1.68+Math.random()*0.1;
		}else{
			forestAreaAngle=1.46-Math.random()*0.1;
		}
		sphericalHelper.set( worldRadius-0.3, forestAreaAngle, row );
	}
	newTree.position.setFromSpherical( sphericalHelper );
	var rollingGroundVector=rollingGroundSphere.position.clone().normalize();
	var treeVector=newTree.position.clone().normalize();
	newTree.quaternion.setFromUnitVectors(treeVector,rollingGroundVector);
	newTree.rotation.x+=(Math.random()*(2*Math.PI/10))+-Math.PI/10;
	rollingGroundSphere.add(newTree);
}

//given in tut
function createTreesPool(){
    var maxTreesInPool=10;
    var newTree;
    for(var i=0; i<maxTreesInPool;i++){
        newTree=createTree();
        treesPool.push(newTree);
    }
}
//given in tut
function addPathTree(){
	var options=[0,1,2];
	var lane= Math.floor(Math.random()*3);
	addTree(true,lane);
	options.splice(lane,1);
	if(Math.random()>0.5){
		lane= Math.floor(Math.random()*2);
		addTree(true,options[lane]);
	}
}

//given in tut
function doTreeLogic(){
	var oneTree;
	var treePos = new THREE.Vector3();
	var treesToRemove=[];
	treesInPath.forEach( function ( element, index ) {
		oneTree=treesInPath[ index ];
		treePos.setFromMatrixPosition( oneTree.matrixWorld );
		if(treePos.z>6 &&oneTree.visible){
			treesToRemove.push(oneTree);
		}
		else{
			if(treePos.distanceTo(heroSphere.position)<=0.6){
				console.log("hit");
				hasCollided=true;
				mySound.play();
				explode();
			}
		}
	});
	var fromWhere;
	treesToRemove.forEach( function ( element, index ) {
		oneTree=treesToRemove[ index ];
		fromWhere=treesInPath.indexOf(oneTree);
		treesInPath.splice(fromWhere,1);
		treesPool.push(oneTree);
		oneTree.visible=false;
		console.log("remove tree");
	});
}

//given in tut
function handleKeyDown(keyEvent){
	if(jumping)return;
	var validMove=true;
	if ( keyEvent.keyCode === 37) {
		if(currentLane==middleLane){
			currentLane=leftLane;
		}else if(currentLane==rightLane){
			currentLane=middleLane;
		}else{
			validMove=false;
		}
	} else if ( keyEvent.keyCode === 39) {
		if(currentLane==middleLane){
			currentLane=rightLane;
		}else if(currentLane==leftLane){
			currentLane=middleLane;
		}else{
			validMove=false;
		}
	}else{
		if ( keyEvent.keyCode === 38){
			bounceValue=0.1;
			jumping=true;
		}
		validMove=false;
	}
	if(validMove){
		jumping=true;
		bounceValue=0.06;
	}
}

//to make the snowflakes fall
function loop() {
		console.log('loop');
		for(var i = 0; i<snowParticles.length; i++) {
			var particle = snowParticles[i];
			particle.updatePhysics();
			with(particle.position) {
				if(y<-1000) y+=2000;
				if(x>1000) x-=2000;
				else if(x<-1000) x+=2000;
				if(z>1000) z-=2000;
				else if(z<-1000) z+=2000;
			}
		}
		camera.lookAt(scene.position);
		renderer.render( scene, camera );
}

//to play sound
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
