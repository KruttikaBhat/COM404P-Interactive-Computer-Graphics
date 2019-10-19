import turtle
PROGNAME = 'Sierpinski Triangle'
#Credits: This code was written by editing the code from http://www.lpb-riannetrujillo.com/blog/python-fractal/

myPen = turtle.Turtle()
myPen.ht()
myPen.speed(5)
myPen.pencolor('orange')

points = [[-175,-125],[0,175],[175,-125]] #size of triangle

def getMid(p1,p2):
    return ( (p1[0]+p2[0]) / 2, (p1[1] + p2[1]) / 2) #find midpoint

def triangle(points,depth):

    myPen.up()
    myPen.goto(points[0][0],points[0][1])
    myPen.down()
    myPen.goto(points[1][0],points[1][1])
    myPen.goto(points[2][0],points[2][1])
    myPen.goto(points[0][0],points[0][1])

    if depth>0:
        triangle([points[0],
                        getMid(points[0], points[1]),
                        getMid(points[0], points[2])],
                   depth-1)
        triangle([points[1],
                        getMid(points[0], points[1]),
                        getMid(points[1], points[2])],
                   depth-1)
        triangle([points[2],
                         getMid(points[2], points[1]),
                         getMid(points[0], points[2])],
                   depth-1)


triangle(points,4)
"""
from turtle import *
import turtle
t = turtle.Turtle()
Window = turtle.Screen()

Window.bgcolor('white')

turtle.color('white')
goto(-200, -200)
def serp_tri(side, level):
    if level == 1:
        for i in range(3):
            turtle.color('black')
            turtle.ht()
            turtle.fd(side)
            turtle.left(120)
            turtle.speed(100000)
    else:
        turtle.ht()
        serp_tri(side/2, level-1)
        turtle.fd(side/2)
        serp_tri(side/2, level-1)
        turtle.bk(side/2)
        turtle.left(60)
        turtle.fd(side/2)
        turtle.right(60)
        serp_tri(side/2, level-1)
        turtle.left(60)
        turtle.bk(side/2)
        turtle.right(60)
        turtle.speed(100000)



def main():
    serp_tri(400, 8)

if __name__ == '__main__':
    main()
    turtle.mainloop()
"""
