Requirements:

Stack you should use: React/TS with Firebase
Deploy a site on Heroku, netlify or github pages that will do the following:

1. Display Map (Google Maps, Mapbox of similar)

2. When User Clicks Map:
  1. Numbered Quest Marker is placed at location on map(1,2,3, etc) similar to this: https://developers.google.com/maps/documentation/javascript/examples/marker-labels
  2. Firebase Database has new record created as a sub-collection in this format:
  ```
  Quest 1:
  -Location: Lat, Long
  -Timestamp: Time
  -Next:
  --Quest 2:
  --Location: Lat, Long
  --Timestamp: Time
  --Next:
  ---Quest 3:
  ---Location: Lat, Long
  ---Timestamp: Time
  ```

3.Deliverables:
1. URL of site deployed on Heroku (or any other cdn) - the site is all front-end and very simple.
2. Link to the git hub repo where you should to upload your code.
3. Access or image of Firebase Data

[DEMO](https://marker-map-8d34b656bbdd.herokuapp.com/)
