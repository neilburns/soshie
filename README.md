soshie
======

Soshie is a social platform and event aggregator that allows users to create and browse public events. 

For demonstration purposes, all events are displayed, as opposed to only the events within a user's geofence; however, the localization feature can be easily activated by making a small modification: in `/app/controllers/index.rb`, in the `/nearby` route, return `local_events` on line 12 rather than `seeded_events`.

Because of how few routes the application handles, Soshie utilizes a lightweight Ruby framework called Sinatra. Also, asynchronous technology (AJAX) and JavaScript animations allow Soshie to exist on a single page. 
