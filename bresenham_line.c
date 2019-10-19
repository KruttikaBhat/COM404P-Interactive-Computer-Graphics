#include<stdio.h>
#include<graphics.h>


void drawline(int x1,int y1,int x2,int y2)
{
  int delx,dely,p,x=x1,y=y1;
  delx=abs(x2-x1);
  dely=abs(y2-y1);
  putpixel(x,y,1);

  //if delx>dely
  if(delx>dely)
  {
    p=2*dely-delx;
    x=x+1;

    while(x<=x2)
    {
      if(p<0)
      {
        putpixel(x,y,1);
        p=p+2*dely;

      }
      else
      {
        putpixel(x,y,1);
        if(y2-y1>=0)
          y=y+1;
        else
          y=y-1;
        p=p+2*dely-2*delx;

      }
      x=x+1;
    }
  }
  else
  {
    p=2*delx-dely;
    if(x2-x1>=0)
      y=y+1;
    else
      y=y-1;

    while(y!=y2)
    {
      if(p<0)
      {
        putpixel(x,y,1);
        p=p+2*delx;

      }
      else
      {
        putpixel(x,y,1);
        x=x+1;
        p=p+2*delx-2*dely;

      }
      if(y2-y1>=0)
        y=y+1;
      else
        y=y-1;
    }


  }


  return;

}

int main()
{
  int x1,y1,x2,y2;

  printf("\nEnter the first point coordinates (x1,y1)\n");
  scanf("%d %d",&x1,&y1);
  printf("\nEnter the second point coordinates (x2,y2)\n");
  scanf("%d %d",&x2,&y2);


  int gd = DETECT, gm, color;
  initgraph(&gd, &gm, "");
  if(x1>x2)
    drawline(x2,y2,x1,y1);
  else
    drawline(x1,y1,x2,y2);
  getch();
  closegraph();
  return 0;
}
