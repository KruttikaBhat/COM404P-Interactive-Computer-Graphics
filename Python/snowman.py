import pygame
import random

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
ORANGE = (255, 165, 0)
sky_blue=(201,233,246)
BROWN=(150,75,0)
SCREEN_WIDTH = 900
SCREEN_HEIGHT = 900





def main():
    pygame.init()
    size = [SCREEN_WIDTH, SCREEN_HEIGHT]
    screen = pygame.display.set_mode(size)

    done = False
    clock = pygame.time.Clock()
    screen.fill(sky_blue)

    while not done:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                done = True
        pygame.draw.circle(screen, WHITE, [400, 400], 80)
        pygame.draw.circle(screen, WHITE, [400,270], 60)
        pygame.draw.circle(screen, WHITE, [400,175], 40)

        pygame.draw.circle(screen, BLACK, [388,165], 5)
        pygame.draw.circle(screen, BLACK, [412,165], 5)

        pygame.draw.polygon(screen, ORANGE, [(398,170),(398,180),(420,175)])

        pygame.draw.circle(screen, BLACK, [400,200], 4)
        pygame.draw.circle(screen, BLACK, [410,196], 4)
        pygame.draw.circle(screen, BLACK, [390,196], 4)
        pygame.draw.circle(screen, BLACK, [420,190], 4)
        pygame.draw.circle(screen, BLACK, [380,190], 4)

        pygame.draw.line(screen,BROWN,(450,250),(500,280),7)
        pygame.draw.line(screen,BROWN,(350,250),(300,280),7)

        pygame.draw.circle(screen, BLACK, [400,240], 8)
        pygame.draw.circle(screen, BLACK, [400,270], 8)
        pygame.draw.circle(screen, BLACK, [400,300], 8)

        pygame.display.flip()


if __name__ == "__main__":
    main()
