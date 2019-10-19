import pygame
import random

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
SCREEN_WIDTH = 900
SCREEN_HEIGHT = 900
global BALL_SIZE
global jump_height

class Ball:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.change_y = 0
        self.initx=0
        self.inity=0


def make_ball():
    ball = Ball()
    ball.x = ball.initx = 400
    ball.y = ball.inity = jump_height
    ball.change_y = 2
    return ball


def main():
    pygame.init()
    size = [SCREEN_WIDTH, SCREEN_HEIGHT]
    screen = pygame.display.set_mode(size)
    global jump_height,BALL_SIZE
    BALL_SIZE=50
    jump_height=100
    jump_count=0
    eps=0.3

    pygame.display.set_caption("Bouncing Balls")
    done = False
    clock = pygame.time.Clock()
    ball = make_ball()

    while not done:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                done = True

        if jump_count!=3:
            ball.y -= ball.change_y
            BALL_SIZE+=eps
            if(ball.y<ball.inity-jump_height or ball.y>ball.inity+(BALL_SIZE/2)):
                if(ball.y>ball.inity+(BALL_SIZE/2)):
                    jump_count+=1
                    ball.inity=ball.y
                    print(jump_count)

                ball.change_y *= -1

            screen.fill(BLACK)
            print(ball.x,ball.y,BALL_SIZE)
            pygame.draw.ellipse(screen, WHITE, (ball.x, ball.y, BALL_SIZE, BALL_SIZE))

        clock.tick(60)
        pygame.display.flip()
        
    pygame.quit()

if __name__ == "__main__":
    main()
