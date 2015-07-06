require([
  'ractive',
  'rap!templates/textDungeon',
  'rap!templates/levels'
], function (Ractive, view, lvls) {
  var restaurants = [
    'Calexico',
    'Chipotle',
    'Chopt',
    "Hm..I don't really know"
  ];
  var instance = new Ractive({
    template: view,
    data: {
      user: {
        items: ['A mysterious object'],
        name: "",
        level: 1
      },
      gameText: "your adventure starts in the Behance office",
      started: false,
      levels: {
        one: {
          restaurants: restaurants,
          current: false
        },
        two: {
          current: false
        }
      },
      alive: true
    },
    el: '#container',
    partials: {
      levels: lvls
    }
  });
  instance.on('startGame', function(event) {
    instance.set('started', true);
    instance.set('levels.one.current', true);
  });
  instance.on('eat', function(event, restaurant) {
    if (restaurant === restaurants[3]) {
      instance.set('gameText', 'You consider your options for so long that you perish. RIP.');
      instance.set('alive', false);
    }
    else if (restaurant === restaurants[2]) {
      instance.set('gameText',
        'You eat your salad, but there are not enough calories and you starve anyways. RIP.');
      instance.set('alive', false);
    }
    else {
      instance.set('gameText', 'You eat, and feel ready for the rest of your day');
      instance.set('levels.one.current', false);
      instance.set('levels.two.current', true);
      // how do you pass event as the first param?
      instance.fire('levelComplete', 1, 1);
    }
  });
  instance.on('levelComplete', function(event, level) {
    //TODO: why is level undefined
    instance.set('user.level', level + 1);
  });
  instance.on('tar', function(event, correct) {
    if (correct) {
      instance.set('gameText', 'Correct, good job! You win I guess');
    }
    else {
      instance.set('alive', false);
      instance.set('gameText', 'You failed and the tar bomb went off');
    }
  });
});
