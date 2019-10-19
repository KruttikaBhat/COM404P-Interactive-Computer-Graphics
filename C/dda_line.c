#include<stdio.h>
#include<graphics.h>
#include<math.h>

int min(int a,int b)
{
  if(a>b)
    return b;
  else
    return a;
}

int max(int a, int b)
{
  if(a>b)
    return a;
  else
    return b;
}

void drawline(int x1,int y1,int x2,int y2)
{
  int xDiff,yDiff,i,start,end;
  float m;
  xDiff=abs(x2-x1);
  yDiff=abs(y2-y1);

  if(xDiff>yDiff)
  {
    int x;
    float y=0;
    start=min(x1,x2);
    end=max(x1,x2);

    m=(float)(y2-y1)/(x2-x1);
    if(start==x1)
      y=y1;
    else
      y=y2;
    for(x=start;x<=end;x+=1)
    {
      if(x!=start)
        y+=m;
      putpixel(x,round(y),RED);
    }
  }
  else if(yDiff>xDiff)
  {
    start=min(y1,y2);
    end=max(y1,y2);
    int y;
    float x=0;
    m=(float)(x2-x1)/(y2-y1);
    if(start==y1)
    {
      x=x1;
    }
    else
    {
      x=x2;
    }
    for(y=start;y<=end;y+=1)
    {
      if(y!=start)
        x+=m;
      putpixel(round(x),y,RED);
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
  drawline(x1,y1,x2,y2);
  getch();
  closegraph();
  return 0;
}
