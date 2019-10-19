#include<stdio.h>
#include<graphics.h>

int main()
{
  int gd = DETECT, gm;
  initgraph(&gd, &gm, "");
  //first floor
  rectangle(50,150,300,250);
  rectangle(45,145,310,150);
  rectangle(50,255,300,250);
  //window 1
  rectangle(70,155,150,215);
  rectangle(73,158,109,213);
  rectangle(111,158,147,213);
  //window 2
  rectangle(200,155,280,215);
  rectangle(203,158,239,213);
  rectangle(241,158,277,213);

  //roof
  line(65,125,45,145);
  line(285,115,409,115);
  line(300,160,350,160);
  line(300,165,350,165);
  //second floor
  //rectangle(65,85,285,125);
  //rectangle(60,80,290,85);
  //body
  line(65,85,65,125);
  line(65,125,90,125);
  line(150,125,200,125);
  line(260,125,285,125);
  line(285,125,285,85);
  //roof
  //line(75,45,275,45);
  line(75,45,106,45);
  line(134,45,216,45);
  line(244,45,275,45);

  line(75,45,60,80);
  line(275,45,290,80);
  //roof skirting
  line(60,85,90,85);
  line(150,85,200,85);
  line(260,85,290,85);
  line(290,85,290,80);
  line(290,80,260,80);
  line(200,80,150,80);
  line(90,80,60,80);
  line(60,80,60,85);
  //second floor window 1
  //rectangle(90,70,150,130);
  //body
  line(90,70,90,130);
  line(90,130,150,130);
  line(150,130,150,70);
  //roof
  line(80,80,120,40);
  line(80,80,80,73);
  line(80,73,120,32);

  line(120,32,160,73);
  line(120,40,160,80);
  line(160,80,160,73);

  //glass part
  rectangle(105,80,135,120);
  rectangle(107,82,119,118);
  rectangle(121,82,133,118);
  arc(120,80,180,0,15);
  arc(120,80,180,0,13);
  line(120,80,129,71);
  line(120,80,120,67);
  line(120,80,111,71);

  //second floor window 2
  //rectangle(200,70,260,130);
  //body
  line(200,70,200,130);
  line(200,130,260,130);
  line(260,130,260,70);
  //roof
  line(190,80,230,40);
  line(190,80,190,73);
  line(190,73,230,32);

  line(230,32,270,73);
  line(230,40,270,80);
  line(270,80,270,73);

  //glass part
  rectangle(215,80,245,120);
  rectangle(217,82,229,118);
  rectangle(231,82,243,118);
  arc(230,80,180,0,15);
  arc(230,80,180,0,13);
  line(230,80,239,71);
  line(230,80,230,67);
  line(230,80,221,71);





  //front door

  rectangle(300,248,360,257);
  rectangle(315,180,345,235);
  line(318,180,318,235);
  line(342,180,342,235);
  rectangle(310,173,350,180);
  circle(322,208,2);

  rectangle(324,212,336,230);

  line(310,235,350,235);
  line(310,235,300,248);
  line(350,235,360,248);
  line(310,235,310,173);
  line(350,235,350,173);
  line(310,173,300,165);
  line(350,173,360,160);

  //window
  rectangle(322,184,338,204);
  rectangle(324,186,336,202);
  line(330,186,330,202);
  line(324,194,336,194);

  //second half
  //rectangle(360,160,480,240);
  line(360,160,360,240);
  line(480,240,480,160);
  rectangle(360,240,480,248);

  //roof
  line(420,115,350,167);
  line(350,167,350,160);
  line(350,160,420,108);

  line(420,115,490,167);
  line(490,167,490,160);
  line(490,160,420,108);

  //window
  rectangle(385,165,455,215);
  rectangle(387,167,404,213);
  rectangle(406,167,434,213);
  rectangle(436,167,453,213);
  arc(420,165,180,0,16);
  arc(420,165,180,0,14);
  line(420,165,430,157);
  line(420,165,420,153);
  line(420,165,410,157);

  getch();
  closegraph();
	return (0);
}
