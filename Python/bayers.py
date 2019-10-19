from PIL import Image
import random
import numpy as np

#initialise
img=Image.new('RGB',(500,500),color='black')
pixels=img.load()
for i in range(img.size[0]):
    for j in range(img.size[1]):
        val=random.randint(0,256)
        if(i%2==0 and j%2==0): #red
            pixels[i,j]=(val,0,0)
        elif((i%2==0 and j%2==1) or (i%2==1 and j%2==0)): #green
            pixels[i,j]=(0,val,0)
        elif(i%2==1 and j%2==1): #blue
            pixels[i,j]=(0,0,val)
print("Initial\n")
for i in range(10):
    for j in range(10):
        print(pixels[i,j])

#bayers
print("After applying algorithm")
img2=Image.new('RGB',(500,500))
pixels2=img2.load()
for i in range(img2.size[0]):
    for j in range(img2.size[1]):
        if(i>0 and i<img2.size[0]-1 and j>0 and j<img2.size[1]-1):#not on border
            if(i%2==0 and j%2==0):#red
                r=pixels[i,j][0]
                g=(pixels[i+1,j][1]+pixels[i-1,j][1]+pixels[i,j+1][1]+pixels[i,j-1][1])/4
                b=(pixels[i+1,j+1][2]+pixels[i+1,j-1][2]+pixels[i-1,j+1][2]+pixels[i-1,j-1][2])/4
                
            elif((i%2==0 and j%2==1) or (i%2==1 and j%2==0)): #green
                g=(pixels[i,j][1]+pixels[i+1,j+1][1]+pixels[i+1,j-1][1]+pixels[i-1,j+1][1]+pixels[i-1,j-1][1])/5
                if(i%2==0):
                    r=(pixels[i,j+1][0]+pixels[i,j-1][0])/2
                    b=(pixels[i+1,j][2]+pixels[i-1,j][2])/2

                else:
                    r=(pixels[i+1,j][0]+pixels[i-1,j][0])/2
                    b=(pixels[i,j+1][2]+pixels[i,j-1][2])/2

            elif(i%2==1 and j%2==1): #blue
                b=pixels[i,j][2]
                g=(pixels[i+1,j][1]+pixels[i-1,j][1]+pixels[i,j+1][1]+pixels[i,j-1][1])/4
                r=(pixels[i+1,j+1][0]+pixels[i+1,j-1][0]+pixels[i-1,j+1][0]+pixels[i-1,j-1][0])/4

            pixels2[i,j]=(int(r),int(g),int(b))
            print(r,g,b)


img.show()
img2.show()
