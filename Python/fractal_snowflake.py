import turtle
import math

win=turtle.Screen()
pen=turtle.Turtle()
pen.speed(100)
depth=4
triangle_base=300
pen.penup()
pen.goto(-triangle_base/2,triangle_base/2)
pen.pendown()

def tri(length,depth):
    if(depth>0):
        tri(length/3,depth-1)
        pen.left(60)
        tri(length/3,depth-1)
        pen.right(120)
        tri(length/3,depth-1)
        pen.left(60)
        tri(length/3,depth-1)
    else:
        pen.fd(length)

for i in range(3):
    tri(triangle_base,3)
    pen.right(120)

win.exitonclick()
