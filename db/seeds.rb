imgurls = ["http://www.nh-hotels.it/offer/concerts-italy/concerts-italy.jpg",
  "http://i1123.photobucket.com/albums/l543/hercampusphoto/Places/Other%20places/250e16cb.jpg",
  "http://www.aepiunc.org/wp-content/uploads/216732_10151423906737615_770169408_n.jpg",
  "http://www.bathsbudapest.com/wp-content/uploads/2013/04/Szechenyi-Bath-Party-Budapest-Szecska-Sandor-Fegyverneky.jpg",
  "http://ryanaweaver.com/files/2013/02/kids-soccer-game.jpg",
  "http://www.thedrum.com/uploads/drum_column_article/119859/main_images/hackathon_0.jpg",
  "http://www2.pictures.zimbio.com/gi/Coco+Crisp+Oakland+Athletics+v+San+Francisco+dkOj3C-S295l.jpg",
  "http://d2omthbq56rzfx.cloudfront.net/wp-content/uploads/2011/05/MacBook-Pro-users-at-Google-IO-2011-image-004.jpg",
  "http://partylegacies.com/wp-content/uploads/2013/09/Michael-Brun.jpg",
  "http://blogimages.thescore.com/nhl/files/2013/05/dustin-brown.jpg"]

addresses = ["4 Pennsylvania Plaza, New York, NY 10001",
  "20 14th Street Tybee Island, GA 31328",
  "200 Knights Hill Road, Camden, South Carolina",
  "Davidson College, Davidson, NC",
  "Davidson College, Davidson, NC",
  "633 Folsom Street, San Francisco, CA",
  "24 Willie Mays Plaza, San Francisco, CA 94107",
  "747 Howard Street, San Francisco, CA 94103",
  "420 Mason St, San Francisco, CA 94102",
  "525 W Santa Clara St, San Jose, CA 95113",
  "1221 Polk Street, San Francisco, CA 94109"]

Event.create({:title => "Calvin Harris Live at MSG",
              :venue => "Madison Square Garden",
              :address => addresses[0],
              :imgurl => imgurls[0],
              :description => "He's the undisputed master of electronic dance music, and he's in New York City for one night only!",
              :datetime => DateTime.now})

Event.create({:title => "Alpha Beta Gamma Spring Formal",
              :venue => "Tybee Gardens",
              :address => addresses[1],
              :imgurl => imgurls[1],
              :description => "Come celebrate spring formal with Alpha Beta Gamma, at the romantic Tybee Gardens.",
              :datetime => DateTime.now})

Event.create({:title => "Carolina Cup Steeplechase Race",
              :venue => "Springdale Race Course",
              :address => addresses[2],
              :imgurl => imgurls[2],
              :description => "College students love the chance to dress up and watch the horses. It's legendarily immemorable...",
              :datetime => DateTime.now})

Event.create({:title => "Pool Party",
              :venue => "Davidson College",
              :address => addresses[3],
              :imgurl => imgurls[3],
              :description => "You're invited to a pool party hosted by the Davidson college swim teams. It's going to make a big splash.",
              :datetime => DateTime.now})

Event.create({:title => "Youth Soccer Tournament",
              :venue => "Davidson College",
              :address => addresses[4],
              :imgurl => imgurls[4],
              :description => "Come on out, if not to watch some tykes kick a ball, then to enjoy the weather.",
              :datetime => DateTime.now})



