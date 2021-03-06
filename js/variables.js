










/***
 *    ███████╗███████╗████████╗████████╗██╗███╗   ██╗ ██████╗ ███████╗                     
 *    ██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ ██╔════╝                     
 *    ███████╗█████╗     ██║      ██║   ██║██╔██╗ ██║██║  ███╗███████╗                     
 *    ╚════██║██╔══╝     ██║      ██║   ██║██║╚██╗██║██║   ██║╚════██║                     
 *    ███████║███████╗   ██║      ██║   ██║██║ ╚████║╚██████╔╝███████║                     
 *    ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝      
 */
 // DOM stuff
 var canvas;
var settings = {
	canvasWidth: 450,
	canvasHeight: 800,
	backgroundSpeeds: {
		y: 4, // default, should be function of enemies number
		x: 0 // going sideways (no)
	},
	score: 200
}
// engine mechanics
var updateLoop;
var friction = 0.89
// spawnEnemies
var enemySpawningTimer = 800;
var isEnemiesSpawning = true;
// spawnBonuses
var isBonusesSpawning = true;
var bonusSpawningTimer = 1200;
// spawn items
var isItemsSpawning = true;
var itemsSpawningTimer = 1200;










/***
 *    ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗                                     
 *    ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗                                    
 *    ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝                                    
 *    ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗                                    
 *    ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║                                    
 *    ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝              
 */
 var pl = {
	x: settings.canvasWidth/3,
	y: settings.canvasHeight - 48,
	w: 24,
	h: 42,
	ms: 4, // MAX speed
	sx: 0, // speed x
	sy: 0, // speed y
	isSpeedingUp: false,
	wasSpeedingUp: false,
	isRageAvailable: false,
	isInvincible: false,
	img: new Image()
}
pl.img.src = "img/spaceshipsprites.gif";
pl.img.startX = 39;
pl.img.startY = 39;
pl.img.spriteWidth = 39;
pl.img.spriteHeight = 39;
var fullHealthWidth =  1*(getComputedStyle(document.getElementById('healthBar')).width.split('px')[0]);
var fullRageWidth =  1*(getComputedStyle(document.getElementById('rageBar')).width.split('px')[0]);
var domRageAmount = document.getElementById('rageAmount');










/***
 *    ██████╗ ██╗██████╗ ███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗           
 *    ██╔══██╗██║██╔══██╗██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝           
 *    ██║  ██║██║██████╔╝█████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗           
 *    ██║  ██║██║██╔══██╗██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║           
 *    ██████╔╝██║██║  ██║███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║           
 *    ╚═════╝ ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝                                                            
 */
 var dirs = {
	left: false,
	up: false,
	down: false,
	right: false,
	arrowUp: false,
	arrowLeft: false,
	arrowDown: false,
	arrowRight: false
};










/***
 *     █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗                              
 *    ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝                              
 *    ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗                              
 *    ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║                              
 *    ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║                              
 *    ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝                                             
 */
 var btns = {
	space: false,
	shift: false,
	action0: false,
	action1: false,
	action2: false,
	action3: false,
	pause: false
}










/***
 *    ███████╗███╗   ██╗████████╗██╗████████╗██╗███████╗███████╗                           
 *    ██╔════╝████╗  ██║╚══██╔══╝██║╚══██╔══╝██║██╔════╝██╔════╝                           
 *    █████╗  ██╔██╗ ██║   ██║   ██║   ██║   ██║█████╗  ███████╗                           
 *    ██╔══╝  ██║╚██╗██║   ██║   ██║   ██║   ██║██╔══╝  ╚════██║                           
 *    ███████╗██║ ╚████║   ██║   ██║   ██║   ██║███████╗███████║                           
 *    ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝    
 */
 var missiles = [];
var enemies = [];
var bonuses = [];
var items = [];
var playerFiringInterval;
var carpetBombingData = {
	type: 'carpetbombing',
    x: 0,
    y: settings.canvasHeight*1.2,
    oy: settings.canvasHeight*1.2,// original Y position
    xd: 0,
    w: 22,
    h: 22,
    sy: 8,
    sx: 12,
    color: 'blue'
}









/***
 *    ███████╗██╗██████╗ ██╗███╗   ██╗ ██████╗                                             
 *    ██╔════╝██║██╔══██╗██║████╗  ██║██╔════╝                                             
 *    █████╗  ██║██████╔╝██║██╔██╗ ██║██║  ███╗                                            
 *    ██╔══╝  ██║██╔══██╗██║██║╚██╗██║██║   ██║                                            
 *    ██║     ██║██║  ██║██║██║ ╚████║╚██████╔╝                                            
 *    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝  
 */
 var firingRate = 100;
var isFiring; 
var wasFiring; 
var firingTimeout = null;










/***
 *    ███████╗███╗   ██╗███████╗███╗   ███╗██╗███████╗███████╗                             
 *    ██╔════╝████╗  ██║██╔════╝████╗ ████║██║██╔════╝██╔════╝                             
 *    █████╗  ██╔██╗ ██║█████╗  ██╔████╔██║██║█████╗  ███████╗                             
 *    ██╔══╝  ██║╚██╗██║██╔══╝  ██║╚██╔╝██║██║██╔══╝  ╚════██║                             
 *    ███████╗██║ ╚████║███████╗██║ ╚═╝ ██║██║███████╗███████║                             
 *    ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝╚═╝╚══════╝╚══════╝                  
 */
// standardEnemyStats
var ses = {
	x: 5,
	y: -72,
	w: 24,
	h: 48,
	sx: 0,
	sy: 4,
	c: 'tomato',
	pts: 5,
	collisionEffect: 'hitEntity'
};










/***
 *    ██████╗  █████╗  ██████╗██╗  ██╗ ██████╗ ██████╗  ██████╗ ██╗   ██╗███╗   ██╗██████╗ 
 *    ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝ ██╔══██╗██╔═══██╗██║   ██║████╗  ██║██╔══██╗
 *    ██████╔╝███████║██║     █████╔╝ ██║  ███╗██████╔╝██║   ██║██║   ██║██╔██╗ ██║██║  ██║
 *    ██╔══██╗██╔══██║██║     ██╔═██╗ ██║   ██║██╔══██╗██║   ██║██║   ██║██║╚██╗██║██║  ██║
 *    ██████╔╝██║  ██║╚██████╗██║  ██╗╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
 *    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
 */
 var bgs = {
	t: null, // top
	l: null, // left
	d: null, // down
	r: null // right
}
var bgPositions = {
	t: {
		x: 0,
		y: (-1*settings.canvasHeight)
	},
	d: {
		x: 0,
		y: 0
	}
}

var background;
var backgroundBis;










/***
 *    ███╗   ███╗██╗███████╗███████╗██╗██╗     ███████╗███████╗                            
 *    ████╗ ████║██║██╔════╝██╔════╝██║██║     ██╔════╝██╔════╝                            
 *    ██╔████╔██║██║███████╗███████╗██║██║     █████╗  ███████╗                            
 *    ██║╚██╔╝██║██║╚════██║╚════██║██║██║     ██╔══╝  ╚════██║                            
 *    ██║ ╚═╝ ██║██║███████║███████║██║███████╗███████╗███████║                            
 *    ╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝╚══════╝╚══════╝╚══════╝   
 */
// missiles stats
var mstats = {
		x: null,
		y: null,
		xd: 0, // x direction
		w: 6,
		h: 6,
		sy: 14, // speed Y axis
		sx: 0 // speed Y axis
	}










/***
 *    ██████╗  ██████╗ ███╗   ██╗██╗   ██╗███████╗███████╗███████╗                         
 *    ██╔══██╗██╔═══██╗████╗  ██║██║   ██║██╔════╝██╔════╝██╔════╝                         
 *    ██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗█████╗  ███████╗                         
 *    ██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║██╔══╝  ╚════██║                         
 *    ██████╔╝╚██████╔╝██║ ╚████║╚██████╔╝███████║███████╗███████║                         
 *    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝  
 */
// bonuses stats
var bonusesMap = new Map();
bonusesMap.set(
	'shield',
	{
		x: null,
		y: null,
		w: 16,
		h: 16,
		sx: [2,5],
		sy: [3,4],
		dirMod: 1, // direction modifier : 1 or -1
		type: 'shield'
	}
);





/***
 *    ██╗    ████████╗    ███████╗    ███╗   ███╗    ███████╗
 *    ██║    ╚══██╔══╝    ██╔════╝    ████╗ ████║    ██╔════╝
 *    ██║       ██║       █████╗      ██╔████╔██║    ███████╗
 *    ██║       ██║       ██╔══╝      ██║╚██╔╝██║    ╚════██║
 *    ██║       ██║       ███████╗    ██║ ╚═╝ ██║    ███████║
 *    ╚═╝       ╚═╝       ╚══════╝    ╚═╝     ╚═╝    ╚══════╝
 *                                                           
 */
 // items stats
var itemsMap = new Map();
itemsMap.set(
	'civilians',
	{
		x: null,
		y: null,
		w: 15,
		h: 25,
		sx: [2,5],
		sy: [3,4],
		dirMod: 1, // direction modifier : 1 or -1
		type: 'civilian',
		effect: 'blockMissile'
	}
);
itemsMap.set(
	'asteroid',
	{
		x: null,
		y: null,
		w: 12,
		h: 12,
		sx: [1,6],
		sy: [3,4],
		dirMod: 1, // direction modifier : 1 or -1
		type: 'asteroid',
		effect: 'blockMissile'
	}
);
