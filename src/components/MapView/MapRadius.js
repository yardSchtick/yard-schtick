const radius = (function(){
    var map;
  var Circles = [
      {
          lat: 51.51328,//main point location
          lon: -0.09021,
          circle_options: {
              radius: 20,
              editable: true
          },
          stroke_options: {
              strokeColor: '#2e6da4',
              strokeWeight: 1.5,
              fillColor: '#337ab7',
              fillOpacity: 0.4
          },
          title: 'Editable circle',
          html: 'Change my size',
          visible: false,
          type: 'circle'
      },
      {
          lat: 51.51420,
          lon: -0.09303,//location of one of the markers
          title: 'A1',
          html: 'A1',
      },
      {
          lat: 51.51498,
          lon: -0.09097,
          title: 'A2',
          html: 'A2',
      },
      {
          lat: 51.51386,
          lon: -0.09559,
          title: 'A3',
          html: 'A3',
      },
      {
          lat: 51.51211,
          lon: -0.09050,
          title: 'A4',
          html: 'A4',
      },
      {
          lat: 51.51226,
          lon: -0.09435,
          title: 'A5',
          html: 'A5',
      },
      {
          lat: 51.513,
          lon: -0.08410,
          title: 'A6',
          html: 'A6',
      }
  ];
    
   map = new Maplace({
      locations: Circles,
      map_div: '#gmap',
      start: 0,
     
      generate_controls: false,
      shared: {
          zoom: 16,
          html: '%index'
      },
      circleRadiusChanged: function(index, point, marker) {
        
      var modifiedLocations =   [{
          lat: 51.51328,
          lon: -0.09021,
          circle_options: {
              radius: marker.getRadius(),
              editable: true
          },
          stroke_options: {
              strokeColor: '#2e6da4',
              strokeWeight: 1.5,
              fillColor: '#337ab7',
              fillOpacity: 0.4
          },
          title: 'Editable circle',
          html: 'Change my size',
          visible: false,
          type: 'circle',
      }];
        
        $('#radiusInfo').text('radius: ' + marker.getRadius() + 'mt.');
        for(var i=1; i<Circles.length; i++) {
          var contains = calcDistance(Circles[i].lat,Circles[i].lon) <= marker.getRadius();
          if(contains) {
            modifiedLocations.push(Circles[i]);
          }
        }
        map.SetLocations(modifiedLocations).Load();
      }
    }).Load();  
  });
  
  function calcDistance(lat, lon){
    var p1 = new google.maps.LatLng(51.51328, -0.09021);
    var p2 = new google.maps.LatLng(lat, lon);
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
  }