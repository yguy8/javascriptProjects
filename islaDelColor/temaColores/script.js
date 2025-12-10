// Diccionario de colores base
const baseColors = {
  rojo: "#ff0000",
  naranja: "#ff7f00",
  amarillo: "#ffff00",
  verde: "#00ff00",
  azul: "#0000ff",
  morado: "#8000ff",
  rosa: "#ff69b4",
  negro: "#000000",
  gris: "#808080",
  blanco: "#ffffff"
};

// Conversión RGB ↔ HSL
function rgbToHsl(r,g,b){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){h=s=0;}
  else{
    const d=max-min;
    s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){
      case r:h=(g-b)/d+(g<b?6:0);break;
      case g:h=(b-r)/d+2;break;
      case b:h=(r-g)/d+4;break;
    }
    h*=60;
  }
  return {h,s,l};
}
function hslToHex(h,s,l){
  const c=(1-Math.abs(2*l-1))*s;
  const x=c*(1-Math.abs((h/60)%2-1));
  const m=l-c/2;
  let r=0,g=0,b=0;
  if(h>=0&&h<60){r=c;g=x;}
  else if(h<120){r=x;g=c;}
  else if(h<180){g=c;b=x;}
  else if(h<240){g=x;b=c;}
  else if(h<300){r=x;b=c;}
  else{r=c;b=x;}
  r=Math.round((r+m)*255);
  g=Math.round((g+m)*255);
  b=Math.round((b+m)*255);
  return "#" + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}
function hexToHsl(hex){
  const r=parseInt(hex.slice(1,3),16);
  const g=parseInt(hex.slice(3,5),16);
  const b=parseInt(hex.slice(5,7),16);
  return rgbToHsl(r,g,b);
}

// Paletas
function getTetradicColors(hex){
  const {h,s,l}=hexToHsl(hex);
  return [
    hslToHex((h+90)%360,s,l),
    hslToHex((h+180)%360,s,l),
    hslToHex((h+270)%360,s,l)
  ];
}

// Ajuste por tema
function adjustByTheme(hex,tema){
  let {h,s,l}=hexToHsl(hex);
  if(tema==="pastel"){
    s=0.4; l=0.8; // colores suaves y claros
  } else if(tema==="vibrante"){
    s=1; l=0.5;
  } else if(tema==="oscuro"){
    s=0.6; l=0.2;
  }
  return hslToHex(h,s,l);
}

// Generar paleta
function generateThemePalette(){
  const tema=document.getElementById("tema").value;
  const colorBase=document.getElementById("colorBase").value;
  const baseHex=baseColors[colorBase];

  let palette=[];
  // Base ajustado
  palette.push(adjustByTheme(baseHex,tema));

  // Pastel usa tetrádica
  if(tema==="pastel"){
    const tetradic=getTetradicColors(baseHex);
    tetradic.forEach(c=>palette.push(adjustByTheme(c,tema)));
  }

  // Vibrante y oscuro también pueden usar tetrádica si quieres
  if(tema==="vibrante" || tema==="oscuro"){
    const tetradic=getTetradicColors(baseHex);
    tetradic.forEach(c=>palette.push(adjustByTheme(c,tema)));
  }

  // Mostrar en pantalla
  const container=document.getElementById("paletteContainer");
  container.innerHTML="";
  palette.forEach(color=>{
    const card=document.createElement("div");
    card.className="color-card";
    card.style.background=color;

    const name=document.createElement("div");
    name.className="color-name";
    name.textContent=color;

    const removeBtn=document.createElement("button");
    removeBtn.className="remove-btn";
    removeBtn.textContent="×";
    removeBtn.onclick=()=>card.remove();

    card.appendChild(name);
    card.appendChild(removeBtn);
    container.appendChild(card);
  });
}
