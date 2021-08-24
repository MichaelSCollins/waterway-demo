
![image](https://user-images.githubusercontent.com/12767561/114125825-37f95b00-98c5-11eb-8681-f749709b19c5.png)

# Kentuckiana Waterways (Problem)

This bare bones project is the starting point for a hypothetical scenario in which Papa John's has decided to begin delivering pizzas via the various streams and rivers found around the Kentuckiana area.
In order to facilitate this transition from roads to waterways, we need to have a dashboard that presents data about the sites that the United States Geological Survey agency actively reports on.

### Objectives

1. On page load, fetch the most recent readings from the USGS Instantaneous Values REST Web Service for Kentucky and Indiana
2. Create map markers for every site retrieved from the API
3. On click of each map marker, an info window should give details about:
   - Site Name
   - Gage height (ft.)
   - Streamflow (cu ft/sec)
   - Water temperature (F)

I've included a map style configuration that takes out a lot of distractions from the surrounding areas, as well as an interface for the expected response structure from USGS.

### Useful documentation:

[Google Maps Angular Component](https://github.com/angular/components/tree/master/src/google-maps)

[USGS IV REST API Testing](https://waterservices.usgs.gov/rest/IV-Test-Tool.html)

### Solution

- This solution shows all sites located in Indiana and Kentucky and any details available from USGS.
- Indiana and Kentucky sites include Gage Height and Streamflow
- Neither Indiana or Kentucky had Water Temperature data available through the network call.

