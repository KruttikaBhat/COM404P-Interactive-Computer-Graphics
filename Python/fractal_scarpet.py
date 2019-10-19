#Draws Sierpinski carpet

import turtle
win=turtle.Screen()
myPen = turtle.Turtle()
myPen.speed(10)
myPen.color("#000000")
center=[0,0]


def box(boxSize,center,depth):
    myPen.penup()
    print(boxSize,center,depth)
    myPen.goto(center[0]-boxSize/2,center[1]-boxSize/2)
    myPen.pendown()
    myPen.begin_fill()
    # 0 deg.
    myPen.forward(boxSize)
    myPen.left(90)
    # 90 deg.
    myPen.forward(boxSize)
    myPen.left(90)
    # 180 deg.
    myPen.forward(boxSize)
    myPen.left(90)
    # 270 deg.
    myPen.forward(boxSize)
    myPen.left(90)
    myPen.end_fill()
    if(depth>0):
        box(boxSize/3,[center[0]+boxSize,center[1]],depth-1)
        box(boxSize/3,[center[0],center[1]+boxSize],depth-1)
        box(boxSize/3,[center[0]-boxSize,center[1]],depth-1)
        box(boxSize/3,[center[0],center[1]-boxSize],depth-1)
        box(boxSize/3,[center[0]+boxSize,center[1]+boxSize],depth-1)
        box(boxSize/3,[center[0]-boxSize,center[1]-boxSize],depth-1)
        box(boxSize/3,[center[0]+boxSize,center[1]-boxSize],depth-1)
        box(boxSize/3,[center[0]-boxSize,center[1]+boxSize],depth-1)


#draw the first box
box(100,center,3)
win.exitonclick()
