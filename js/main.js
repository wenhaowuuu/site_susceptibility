// map.getCanvas().style.cursor = 'default';
//var satellite map
var mapLink =
   '<a href="http://www.esri.com/">Esri</a>';
var wholink =
   'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

var satellitemap = L.tileLayer(
   'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
   attribution: '&copy; '+mapLink+', '+wholink,
   minzoom: 5,
   maxZoom: 19,
});

//nightlight map
var nightlightmap = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
});


var topomap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});


var cartomap = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

var stamenmap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});


//load custom styled mapbox basemap
mapboxgl.accessToken = 'pk.eyJ1Ijoid2VuaGFvYnJpYW4iLCJhIjoiY2owaXNrNzhnMDB4ZjJxdGoxdHdkd2VibiJ9.Cn_2Ypo7UctdNZHt6OlDHA';
// var map0 = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/satellite-v9',
//     zoom: 12,
//     center: [-122.404684,37.783488]
// });

var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/wenhaobrian/cjygvkpdg0ugy1dl5jhx3wnln',
    // style: 'mapbox://styles/wenhaobrian/cjykdqc1t0tti1cnw8mmvr4n4',
    style: 'mapbox://styles/wenhaobrian/ck0ytfpm70oad1cp862wxpmzh',
    zoom: 12,
    center: [-122.419780,37.779498],
    pitch: 60, // pitch in degrees
    bearing: 170, // bearing in degrees
});


//load data from external source:
// map.addSource('districts', {
//   type: 'geojson',
//   data: 'https://mydomain.mydata.geojson'
// });


//control on layers display by user
var toggleableLayerIds =
  [
    '',
    // 'Pipeline Dataset',
    '2019 Q1 Development Pipeline',
    'Parcels not in pipeline',
    '',

   // Model Prediction
    'Prediction: in pipeline',
    // 'Model 3: Prediction 2050 - No Zoning',
    // 'Pipeline Data',
    '',
    'Supervisor District',
    'Liquefaction Zones',
    'Zoned as Industrial',
    'BART stations',
    'BART 5min Walkshed',
    'Population Density'
    // 'SOM Towers'
    // 'Zoned as Residential',
    // 'Contour Lines',
    // 'Flickr Density'
  ];


  for (var i = 0; i < toggleableLayerIds.length; i++) {
      var id = toggleableLayerIds[i];

      var link = document.createElement('a');
      link.href = '#';
      link.className = 'active';
      link.textContent = id;

      link.onclick = function (e) {
          var clickedLayer = this.textContent;
          e.preventDefault();
          e.stopPropagation();

          var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

          if (visibility === 'visible') {
              map.setLayoutProperty(clickedLayer, 'visibility', 'none');
              this.className = '';
          } else {
              this.className = 'active';
              map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
          }
      };

      var layers = document.getElementById('menu');
      layers.appendChild(link);
  }


map.on('load', function () {
  //put the layers beneath the symbols
  //reference: https://docs.mapbox.com/mapbox-gl-js/example/geojson-layer-in-stack/
  var layers = map.getStyle().layers;

  // Find the index of the first symbol layer in the map style, so that the layer added can below the basemap object
  var firstSymbolId1;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId1 = layers[i].id;
      break;
      }
    }
  map.addLayer({
      'id': '2019 Q1 Development Pipeline',
      'type': 'circle',
      'source': {
            'type': 'geojson',
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/development_potential/master/layer_data/SF%20Development%20Pipeline%202019%20Q1.geojson'
      },

      'layout': {
          'visibility': 'none'
      },
      'paint': {
        'circle-radius': 3,
        'circle-color': '#54BDE7',
        // 'fill-opacity': 0.05,
        // 'opacity': 0.5,
      },
  }, firstSymbolId1);

  //add popup to the model 1 prediction parcels
  map.on('click', '2019 Q1 Development Pipeline', function(e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<strong>2012 Q1</strong>"
        + "<br>"
        + "<br>"
        + "Block-lot number: "
        + "<strong>"
        + e.features[0].properties.block_lot
        + "</strong>"
        + "<br>"
        + "Address: "
        + "<strong>"
        + e.features[0].properties.location_1_address
        + "</strong>"
        + "<br>"
        + "Zoning: "
        + "<strong>"
        + e.features[0].properties.zoning
        + "</strong>"
        + "<br>"
        + "Land Use: "
        + "<strong>"
        + e.features[0].properties.landuse
        + "</strong>"
        + "<br>"
        + "Project Date: "
        + "<strong>"
        + e.features[0].properties.project_date.substr(0,10)
        + "</strong>"
        + "<br>"
        + "Height Limit: "
        + "<strong>"
        + e.features[0].properties.heightlimit
        + "</strong>")
      .addTo(map);
  });



// 2019 Q2 dev pipeline parcels
// https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/SF%20Development%20Pipeline%202019%20Q2.geojson


  //show the not in pipeline parcels:
  // Potential parcels not in pipeline
  var firstSymbolId2;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId2 = layers[i].id;
      break;
      }
    }

  map.addLayer({
      'id': 'Parcels not in pipeline',
      'type': 'line',
      'source': {
            'type': 'geojson',
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191110_PRCL_NOPIPE_NO_RESI_OPSP_CIE_L4000SQFT1.geojson?token=AFTLPOUJBNTECJA5KQLPLMC52IXOE'
      },

      'layout': {
          'visibility': 'none'
      },
      'paint': {
          // 'fill-color': 'rgba(87, 94, 98, 0.6)',
          // 'fill-outline-color': 'rgba(36, 68, 89, 1)'

          // '#5DADE2',
          // 'fill-opacity': 0.05,

          'line-color': '#FBB242',
          'line-width': 1.2
      },
  },
  firstSymbolId2);


  map.on('click', 'Parcels not in pipeline', function(e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "Parcel id: "
        + "<strong>"
        + e.features[0].properties.mapblklot
        + "</strong>"
        + "<br>"
        + "Built year: "
        + "<strong>"
        + e.features[0].properties.yrbuilt
        + "</strong>"
        +"<br>"
        + "Use: "
        + e.features[0].properties.landuse
        + "</strong>")
      .addTo(map);
  });



  var firstSymbolId3;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId3 = layers[i].id;
      break;
      }
    }
  map.addLayer({
      'id': 'Prediction: in pipeline',
      'type': 'fill',
      'source': {
            'type': 'geojson',
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/development_potential/master/layer_data/20190729_M1_PREDICTED_PRCLS_YES.geojson'
      },

      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#E74C3C',
          'fill-opacity': 0.8
      },
  }, firstSymbolId3);

  //add popup to the model 1 prediction parcels
  map.on('click', 'Prediction: in pipeline', function(e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<strong>Model 1 Prediction</strong>"
        + "<br>"
        + "<br>"
        + "Block-lot number: "
        + "<strong>"
        + e.features[0].properties.BLKLT
        + "</strong>"
        + "<br>"
        + "Development Probability: "
        + "<strong>"
        + (e.features[0].properties.Predicti_2 * 100).toFixed(2)
        + "%")
      .addTo(map);
  });



  var firstSymbolId4;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId4 = layers[i].id;
      break;
      }
    }

  map.addLayer({
      'id': 'Supervisor District',
      'type': 'line',
      'source': {
            'type': 'geojson',
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/development_potential/master/layer_data/Current%20Supervisor%20Districts.geojson'
      },

      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'line-color': '#5DADE2',
          'line-width': 1.5
      },
  },
firstSymbolId4);

map.on('click', 'Supervisor District', function(e) {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "District: "
      + "<strong>"
      + e.features[0].properties.supervisor
      + "</strong>"
      + "<br>"
      + "Name: "
      + "<strong>"
      + e.features[0].properties.supname)
    .addTo(map);
});


//Liquefaction zones
var firstSymbolI5;
for (var i = 0; i < layers.length; i++) {
  if (layers[i].type === 'symbol') {
    firstSymbolId5 = layers[i].id;
    break;
    }
  }

  map.addLayer({
      'id': 'Liquefaction Zones',
      'type': 'fill',
      'source': {
            'type': 'geojson',
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/development_potential/master/layer_data/San%20Francisco%20Seismic%20Hazard%20Zones.geojson'
      },

      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#FC6300',
          'fill-opacity': 0.4

      },
      // 'source-layer': 'museum-cusco'
  }, firstSymbolId5);


  var firstSymbolId6;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId6 = layers[i].id;
      break;
      }
    }
  map.addLayer({
      'id': 'Zoned as Industrial',
      'type': 'fill',
      'source': {
            'type': 'geojson',
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/development_potential/master/layer_data/20190726_ZONING_INDUSTRIAL.geojson'
      },

      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': '#AE56FB',
          'fill-opacity': 0.5
          // 'line-color': '#5gg8f2',
          // 'line-width': 1.5
      },
  }, firstSymbolId6);


  //BART stations
  var firstSymbolI7;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId7 = layers[i].id;
      break;
      }
    }

    map.addLayer({
        'id': 'BART stations',
        'type': 'circle',
        'source': {
              'type': 'geojson',
              'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20190925_BART_STATIONS.geojson'
        },

        'layout': {
            'visibility': 'none'
        },

        'paint': {
          'circle-radius': 5,
          'circle-color': '#2980B9',


        },
        // 'source-layer': 'museum-cusco'
    }, firstSymbolId7);

    //BART stations
    var firstSymbolI8;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol') {
        firstSymbolId8 = layers[i].id;
        break;
        }
      }

      map.addLayer({
          'id': 'BART 5min Walkshed',
          'type': 'fill',
          'source': {
                'type': 'geojson',
                'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191124_BART_BUFF_5MIN.geojson'
          },

          'layout': {
              'visibility': 'none'
          },

          'paint': {
            'fill-color': '#85C1E9',
            'fill-opacity': 0.5


          },
          // 'source-layer': 'museum-cusco'
      }, firstSymbolId8);





  //ADD THE POP DENSITY FOR EACH NEIGHBORHOODS IN 3D VIEW:
  map.addLayer({
      'id': 'Population Density',
      'type': 'fill-extrusion',
      'source': {
            'type': 'geojson',
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/development_potential/master/layer_data/20190730_NHBHD_POPDENS_NEW_COLOR.geojson'
      },

      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-extrusion-color': [
              'match',
              ['get', 'RANGE'],
              1, '#ffffcc',
              2, '#c7e9b4',
              3, '#7fcdbb',
              4, '#41b6c4',
              5, '#2c7fb8',
              6, '#253494',
              '#FFFFFF'
              // 1, '#FFCA28',
              // 2, '#FF7043',
              // 3, '#E53935',
              // 4, '#990033',
              // 5, '#880E4F',
              // 6, '#330066',
              // '#FFFFFF'
          ],
          // '#82E0AA',
          'fill-extrusion-height': ['get', 'height_2'],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.6,

          // 'line-color': '#F5F52D',
          // 'line-width': 1.5
      },
  });

  //add popup to the neighborhoods population density
  map.on('click', 'Population Density', function(e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        // "<strong>Population</strong>"
        "Neighborhood: "
        + "<strong>"
        + e.features[0].properties.name
        + "</strong>"
        + "<br>"
        + "Population Density: "
        + "<strong>"
        + e.features[0].properties._mean.toFixed(0)
        + "</strong>"
        + " per sq mi"
      )
      .addTo(map);
  });




  //the existing pipeline Data in the past 2012 - 2019
  //2012


    //ADD LEGEND FOR THE POPULATION DENSITY
    var layers = ['Susceptible to Development','0-3000', '3000-6000', '6000-9000', '9000-12000', '12000-36000', '>36000'];
    var colors = [
      '#E74C3C',
      '#ffffcc',
      '#c7e9b4',
      '#7fcdbb',
      '#41b6c4',
      '#2c7fb8',
      '#253494'
    ];

    for (i = 0; i < layers.length; i++) {
      var layer = layers[i];
      var color = colors[i];
      var item = document.createElement('div');
      var key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = color;

      var value = document.createElement('span');
      value.innerHTML = layer;
      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
    }


});






//add drawing tool
mapboxgl.accessToken = 'pk.eyJ1Ijoid2VuaGFvYnJpYW4iLCJhIjoiY2owaXNrNzhnMDB4ZjJxdGoxdHdkd2VibiJ9.Cn_2Ypo7UctdNZHt6OlDHA';
// var map = new mapboxgl.Map({
//     container: 'map', // container id
//     style: 'mapbox://styles/mapbox/satellite-v9', //hosted style id
//     center: [-91.874, 42.760], // starting position
//     zoom: 12 // starting zoom
// });

var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true
    }
});
map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

function updateArea(e) {
    var data = draw.getAll();
    var answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
        var area = turf.area(data);
        // restrict to area to 2 decimal points
        var rounded_area = Math.round(area*100)/100;
        answer.innerHTML = '<p><strong>' + rounded_area + '</strong></p><p>square meters</p>';
    } else {
        answer.innerHTML = '';
        if (e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
    }
}
