#include<stdio.h>
#include<graphics.h>

void putPoints(int x,int y,int pointX,int pointY)
{
	putpixel(x+pointX,y+pointY,1); //octet 2
	putpixel(x+pointY,y+pointX,1); //octet 1
	putpixel(x-pointX,y+pointY,1); //octet 3
	putpixel(x-pointY,y+pointX,1); //octet 4
	putpixel(x-pointY,y-pointX,1); //octet 5
	putpixel(x-pointX,y-pointY,1); //octet 6
	putpixel(x+pointX,y-pointY,1); //octet 7
	putpixel(x+pointY,y-pointX,1); //octet 8
			

}

void drawcircle(int x,int y,int r)
{
	int d=3-(2*r),pointX=0,pointY=r;
	while(pointX<=pointY)
	{
		putPoints(x,y,pointX,pointY);
		if(d<0)
		{
			d=d+(4*pointX)+6;
		}
		else
		{
			d=d+4*(pointX-pointY)+10;
			pointY=pointY-1;
		}
		pointX=pointX+1;
	}
}

int main()
{
	int x,y,r;
	printf("Enter the center point\n");
	scanf("%d %d",&x,&y);
	printf("Enter the radius\n");
	scanf("%d",&r);
	int gd = DETECT, gm, color;
  	initgraph(&gd, &gm, "");
  	drawcircle(x,y,r);
  	getch();
 	closegraph();
	return(0);
}	
