#include<stdio.h>
#include<graphics.h>
#include<math.h>
#define PI 3.14159265359

void drawcircle(int x,int y,int r)
{
  float theta,pointX,pointY;
  for(theta=0;theta<=2*PI;theta+=PI/180)
  {
    pointX=x+(r*sin(theta));
    pointY=y+(r*cos(theta));
    putpixel(pointX,pointY,RED);
  }

  return;

}

int main()
{
  int x,y,r;

  printf("\nEnter the center (x,y)\n");
  scanf("%d %d",&x,&y);
  printf("\nEnter the radius\n");
  scanf("%d",&r);


  int gd = DETECT, gm, color;
  initgraph(&gd, &gm, "");
  drawcircle(x,y,r);
  getch();
  closegraph();
  return 0;
}
