const CONSTS = {
    headerHeight: 40,
    cardDimensions: {
        x: 150,
        y: 225,
    },
    spacer: 50,
    maxPileHeight: 750,
    maxWidth: 1450,
    maxHeight: 1125,
    moveDuration: 1,
    numCards: 52,
    dealCardsDelay: 2000,
    cardBacks: [
        'ladybird',
        'checker',
        'default',
        'target',
        'sunbeam',
    ],
}

const piles = {
    deck: {
        base: {
            x: 0,
            y: 0,
        },
        offset: {
            x: .5,
            y: .5,
        },
    },
    discardPile: {
        base: {
            x: 4,
            y: 0,
        },
        offset: {
            x: 45,
            y: 0,
        }
    },
    pile1: {
        base: {
            x: 0,
            y: 5.5,
        },
        offset: {
            x: 0,
            y: 45,
        },
    },
    pile2: {
        base: {
            x: 4,
            y: 5.5,
        },
        offset: {
            x: 0,
            y: 45,
        },
    },
    pile3: {
        base: {
            x: 8,
            y: 5.5,
        },
        offset: {
            x: 0,
            y: 45,
        },
    },
    pile4: {
        base: {
            x: 12,
            y: 5.5,
        },
        offset: {
            x: 0,
            y: 45,
        },
    },
    pile5: {
        base: {
            x: 16,
            y: 5.5,
        },
        offset: {
            x: 0,
            y: 45,
        },
    },
    pile6: {
        base: {
            x: 20,
            y: 5.5,
        },
        offset: {
            x: 0,
            y: 45,
        },
    },
    pile7: {
        base: {
            x: 24,
            y: 5.5,
        },
        offset: {
            x: 0,
            y: 45,
        },
    },
    foundationH: {
        suit: 'h',
        base: {
            x: 12,
            y: 0,
        },
        offset: {
            x: 0,
            y: 0,
        },
    },
    foundationD: {
        suit: 'd',
        base: {
            x: 16,
            y: 0,
        },
        offset: {
            x: 0,
            y: 0,
        },
    },
    foundationS: {
        suit: 's',
        base: {
            x: 20,
            y: 0,
        },
        offset: {
            x: 0,
            y: 0,
        },
    },
    foundationC: {
        suit: 'c',
        base: {
            x: 24,
            y: 0,
        },
        offset: {
            x: 0,
            y: 0,
        },
    }

};

const GAME_STATE = {
    PLAYING: 'playing',
    WON: 'gameWon',
}

export { CONSTS, piles, GAME_STATE };