import pygame
import random
import math

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
SCREEN_WIDTH = 1000
SCREEN_HEIGHT = 1000

class Man:
    def __init__(self):
        self.rightLeg = []
        self.leftLeg = []
        self.rightArm = []
        self.leftArm = []
        self.arm_joint=[]
        self.leg_joint=[]
        self.head_joint=[]
        self.head=[]
        self.move=0
        self.arm_length=0
        self.headSize=40
        self.count=0
        self.mode=0


def make_man():
    man = Man()
    man.rightLeg.append(440)
    man.rightLeg.append(400)
    man.leftLeg.append(360)
    man.leftLeg.append(400)
    man.rightArm.append(440)
    man.rightArm.append(320)
    man.leftArm.append(360)
    man.leftArm.append(320)
    man.arm_joint.append(400)
    man.arm_joint.append(270)
    man.leg_joint.append(400)
    man.leg_joint.append(350)
    man.head_joint.append(400)
    man.head_joint.append(240)
    man.head.append(400)
    man.head.append(200)
    man.arm_length=math.sqrt((man.rightArm[0]-man.arm_joint[0])**2+(man.rightArm[1]-man.arm_joint[1])**2)
    man.leg_length=math.sqrt((man.rightLeg[0]-man.leg_joint[0])**2+(man.rightLeg[1]-man.leg_joint[1])**2)
    man.move=2
    return man


def main():
    pygame.init()
    size = [SCREEN_WIDTH, SCREEN_HEIGHT]
    screen = pygame.display.set_mode(size)
    pygame.display.set_caption("Dancing stick man")
    done = False
    clock = pygame.time.Clock()
    man = make_man()
    while not done:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                done = True

        print(man.count)
        if(man.count!=4):
            man.leftArm[0]-=man.move
            man.rightArm[0]-=man.move
            man.leg_joint[0]+=man.move/2
            man.head_joint[0]-=man.move/2
            man.head[0]-=man.move/2
            man.arm_joint[0]=((man.arm_joint[1]-man.leg_joint[1])*(man.head_joint[0]-man.leg_joint[0])/(man.head_joint[1]-man.leg_joint[1]))+man.leg_joint[0]
            print(man.leg_joint[0])
            if(man.leg_joint[0]>420 or man.leg_joint[0]<380):
                man.move*=-1
                man.count+=1
                if(man.count==4):
                    man.mode=(man.mode+1)%2

        else:
            if(man.mode==1):
                man.leftArm[1]-=man.move
                man.rightArm[1]-=man.move
            if(man.mode==0):
                man.leftArm[1]+=man.move
                man.rightArm[1]+=man.move
            print(man.rightArm[1],man.head_joint[1])
            if((man.rightArm[1]<man.head_joint[1] and man.mode==1) or (man.rightArm[1]>320 and man.mode==0)):
                man.count=0

        screen.fill(BLACK)
        #body
        pygame.draw.circle(screen, WHITE, (man.head[0],man.head[1]), man.headSize,1)
        pygame.draw.line(screen,WHITE,(man.head_joint[0],man.head_joint[1]),(man.leg_joint[0],man.leg_joint[1]),1)
        #legs
        pygame.draw.line(screen,WHITE,(man.leg_joint[0],man.leg_joint[1]),(man.rightLeg[0],man.rightLeg[1]),1)
        pygame.draw.line(screen,WHITE,(man.leg_joint[0],man.leg_joint[1]),(man.leftLeg[0],man.leftLeg[1]),1)
        #arms
        pygame.draw.line(screen,WHITE,(man.arm_joint[0],man.arm_joint[1]),(man.rightArm[0],man.rightArm[1]),1)
        pygame.draw.line(screen,WHITE,(man.arm_joint[0],man.arm_joint[1]),(man.leftArm[0],man.leftArm[1]),1)
        clock.tick(60)
        pygame.display.flip()

    pygame.quit()

if __name__ == "__main__":
    main()
