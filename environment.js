import * as T from 'three';
// Local frame: Rua Natal follows X, Rua Vitória follows Z. Coordinates are
// visually estimated from supplied satellite screenshots, not surveyed GIS.
export function buildEnvironment(scene){
 const group=new T.Group();group.name='Entorno Flamboyant';scene.add(group);
 const materials={};const material=c=>materials[c]??=new T.MeshStandardMaterial({color:c,roughness:.88});
 const batches=new Map();
 let roadLevel=0;
 function box(w,h,d,x,y,z,c,angle=0){let batch=batches.get(c);if(!batch){batch=[];batches.set(c,batch)}const o=new T.Object3D();o.position.set(x,y,z);o.rotation.y=angle;o.scale.set(w,h,d);o.updateMatrix();batch.push(o.matrix.clone())}
 function mesh(geo,c,x,y,z){const m=new T.Mesh(geo,material(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;group.add(m);return m}
 function tree(x,z,r=2.1){box(.35,3,.35,x,1.5,z,0x665345);mesh(new T.IcosahedronGeometry(r,1),0x496747,x,4,z)}
 function road(points,width=10){const lift=(roadLevel++)*.035;for(let i=1;i<points.length;i++){const [x,z]=points[i-1],[xx,zz]=points[i];const length=Math.hypot(xx-x,zz-z),angle=Math.atan2(xx-x,zz-z);box(width+3,.14,length,(x+xx)/2,.03+lift,(z+zz)/2,0xa5a193,angle);box(width,.16,length,(x+xx)/2,.13+lift,(z+zz)/2,0x494c50,angle);for(let t=5;t<length;t+=13)box(.16,.03,5,x+(xx-x)*t/length,.24+lift,z+(zz-z)*t/length,0xd5cdb1,angle)}}
 box(1500,.5,1500,0,-.5,0,0x687060);
 // Orthogonal local streets around the Ryokan; avenues bend east of the mall.
 for(const z of [21,-66,-153,108,195])road([[-300,z],[215,z]],z===195?15:9);
 for(const x of [-28,-108,-195,62,145])road([[x,-160],[x,300]],x===-195?16:9);
 road([[-195,-400],[-195,-180],[-170,-135],[-170,260]],16);
 road([[6,-420],[1,-345],[-3,-265],[8,-190],[37,-154],[190,-153],[231,-133],[248,-69],[250,20],[232,107],[238,190]],15);
 road([[265,-420],[295,-310],[302,-175],[306,-30],[320,140],[356,295]],19);
 road([[390,-490],[390,380]],25);
 for(const z of [-66,21,108])for(let i=0;i<6;i++)box(.8,.025,8,-35+i*2,.25,z,0xe5dfcf);
 // The mall's irregular footprint: longitudinal retail blocks and angled south garage.
 box(105,13,105,101,6.7,-290,0xd6d6ce);box(99,17,83,105,8.7,-205,0xe5e4db);
 box(69,12,50,91,6.2,-140,0xdddcd4);box(116,15,64,112,7.7,-88,0xdbded8);
 box(105,.6,105,101,13.5,-290,0xf0eee5);box(99,.6,83,105,17.5,-205,0xefeee6);
 // Roof clerestories, structural seams and service equipment.
 for(let z=-335;z<-160;z+=15){box(95,.3,.25,102,18,z,0xaeb2af);box(8,2,4,75,18,z,0xb5b9b5)}
 box(13,3,58,113,18.7,-227,0x8f9f9d);
 for(let x=58;x<163;x+=18)box(.5,1,64,x,16,-88,0x8b9697);
 // Garage: horizontal open floors and long pale sawtooth roofing.
 for(let y=3;y<=12;y+=3){box(116,.4,64,112,y,-88,0xf4f1e8);for(let x=58;x<170;x+=12)box(.7,3,1,x,y-1.4,-55.8,0xdddcd4)}
 const dome=mesh(new T.SphereGeometry(13,24,12,0,Math.PI*2,0,Math.PI/2),0x729197,89,13,-146);dome.scale.y=.6;
 for(let a=0;a<Math.PI*2;a+=Math.PI/12){const arch=new T.Mesh(new T.TorusGeometry(13,.11,4,36,Math.PI),material(0xc5caca));arch.rotation.y=a;arch.scale.y=.6;arch.position.set(89,13,-146);group.add(arch)}
 mesh(new T.CylinderGeometry(3.4,3.4,24,16),0xe0dfd5,153,12,-151);box(8,1,8,153,24.5,-151,0x434948);
 mesh(new T.CylinderGeometry(3.8,3.8,17,16),0xe0dfd5,55,8.5,-326);
 // Red entrance portals and articulated front facade.
 for(const z of [-280,-198]){box(1,8,25,48,6,z,0x912d3b);box(2,9,27,47,5,z,0xb83245);box(.2,4,13,45.8,3,z,0x263e48)}
 for(let z=-331;z<-162;z+=13)box(.4,13,.45,48.1,6.5,z,0x859394);
 function sign(text,x,y,z,width){const c=document.createElement('canvas');c.width=1024;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#f8f3e8';ctx.font='500 52px sans-serif';ctx.textAlign='center';ctx.fillText(text,512,84);const m=new T.Mesh(new T.PlaneGeometry(width,width/8),new T.MeshBasicMaterial({map:new T.CanvasTexture(c),transparent:true,side:T.DoubleSide}));m.position.set(x,y,z);m.rotation.y=-Math.PI/2;group.add(m)}
 sign('FLAMBOYANT',45.6,9,-198,23);sign('FLAMBOYANT',45.6,9,-280,23);
 function parking(cx,cz,w,d){box(w,.12,d,cx,.17,cz,0x555958);for(let z=cz-d/2+7;z<cz+d/2-5;z+=15)for(let x=cx-w/2+4;x<cx+w/2-4;x+=3){box(.12,.025,5,x,.25,z,0xd6d4c7);if((Math.round(x*3+z)%5+5)%5<2){const color=[0xbfc6c8,0xeeeeea,0x394b61,0x974a46][Math.abs(Math.round(x+z))%4];box(1.7,1.1,3.6,x+1.4,.82,z,color);box(1.35,.6,1.8,x+1.4,1.4,z,0x57666a)}}for(let z=cz-d/2+8;z<cz+d/2;z+=24)tree(cx-w/2+3,z);}
 parking(18,-264,40,160);parking(205,-265,75,175);parking(130,-22,180,57);
 // Closely spaced parking shade structures visible south and east of the mall.
 for(let x=166;x<242;x+=13){box(8,3,45,x,1.7,-37,0x808980);for(let z=-57;z<-15;z+=7){const roof=mesh(new T.ConeGeometry(5.8,2,4),0xb5b5a8,x,4,z);roof.rotation.y=Math.PI/4;roof.scale.z=1.2}}
 // Carrefour, experience hall and neighboring large retail premises.
 box(73,10,65,262,5.2,-166,0xc9ccc7);box(73,.4,65,262,10.5,-166,0xe1e1d9);parking(268,-235,84,55);
 box(55,9,44,210,4.7,-153,0xb8c5c8);box(57,.4,46,210,9.4,-153,0xd8dcd8);
 box(69,7,43,293,3.7,33,0xb8b9af);box(69,.5,43,293,7.4,33,0xd9d8ca);
 // Specific neighboring tower clusters traced from the screenshots.
 const towers=[[-143,43,21,21,52],[22,77,23,24,60],[103,69,21,22,63],[108,141,22,23,57],[-43,145,28,20,71],[-128,150,19,26,56],[-239,-130,23,25,55],[-242,46,25,22,49]];
 function building(x,z,w,d,h,index){const colors=[0xc8c4b6,0xe1ded2,0xa7b6b5,0xbeb3a3];box(w+7,4,d+7,x,2,z,0xaaa99d);box(w,h,d,x,h/2+4,z,colors[index%4]);box(w+1,.6,d+1,x,h+4.3,z,0xd6d5ca);box(w*.35,3,d*.35,x,h+5.8,z,0xa1a398);for(let y=7;y<h+3;y+=3.3){box(w+.4,.28,d+.4,x,y,z,0xe5e0d4);for(let dx=-w/2+2;dx<w/2;dx+=3.5){box(1.5,1.6,.12,x+dx,y+1.1,z+d/2+.1,0x53646a);box(1.5,1.6,.12,x+dx,y+1.1,z-d/2-.1,0x53646a)} }tree(x-w/2-4,z)}
 towers.forEach((t,i)=>building(...t,i));
 // Residential blocks: terracotta pitched roofs, walls and individual gardens.
 const blocks=[[-65,62],[-65,-69],[-145,-27],[-145,104],[-65,235],[23,145],[104,235],[-240,110],[-240,220],[-270,-250],[-110,-260],[-270,-340]];
 for(const [cx,cz] of blocks)for(let row=0;row<2;row++)for(let col=0;col<4;col++){const x=cx-24+col*14,z=cz-17+row*33;if(Math.hypot(x+65,z+25)<43)continue;box(12,.2,26,x,.35,z,0x8b8874);box(10,3.4,16,x,1.8,z,0xc6bca7);const geo=new T.CylinderGeometry(0,7.4,2.7,4);const roof=mesh(geo,0xa3674d,x,4.3,z);roof.rotation.y=Math.PI/4;roof.scale.z=1.5;box(12,1.6,.3,x,.9,z+13,0xd1c6b2);tree(x-4,z+9,1.4)}
 for(let z=-375;z<-55;z+=18){tree(-8,z,2.5);tree(177,z,2.4)}for(let x=5;x<170;x+=16)tree(x,-54,2.4);
 for(const [c,matrices] of batches){const inst=new T.InstancedMesh(new T.BoxGeometry(1,1,1),material(c),matrices.length);matrices.forEach((m,i)=>inst.setMatrixAt(i,m));inst.castShadow=false;inst.receiveShadow=false;group.add(inst)}
 return group;
}
