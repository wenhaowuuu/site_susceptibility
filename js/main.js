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


var prcl_nopipe = "https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191220_SOMA_NOPIPE_13-19_ASSR_JOINED_N1.geojson";

//load data from external source:
// map.addSource('districts', {
//   type: 'geojson',
//   data: 'https://mydomain.mydata.geojson'
// });


//jquery for filter control
// $(function() {
//   const cssClasses = [
//     'rangeslider--is-lowest-value',
//     'rangeslider--is-highest-value'
//   ];
//
//   $('input[type=range]')
//     .rangeslider({
//       polyfill: false
//     })
//     .on('input', function() {
//       const fraction = (this.value - this.min) / (this.max - this.min);
//       if (fraction === 0) {
//         this.nextSibling.classList.add(cssClasses[0]);
//       } else if (fraction === 1) {
//         this.nextSibling.classList.add(cssClasses[1]);
//       } else {
//         this.nextSibling.classList.remove(...cssClasses)
//       }
//     });
// });


//control on layers display by user
var toggleableLayerIds =
  [
    '',
    // 'SOMA Boundary'
    'Site Boundary',
    '',
    // 'Pipeline Dataset',
    'Parcels in Development Pipeline',
    '2019 Q1Q2 Development Pipeline',
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
    'BART line',
    'BART 5min Walkshed',
    'BART 10min Walkshed',
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

  var firstSymbolI0;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId0 = layers[i].id;
      break;
      }
    }

  map.addLayer({
      'id': 'Site Boundary',
      'type': 'line',
      'source': {
            'type': 'geojson',
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191219_SOMA_BOUNDARY.geojson'
      },

      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'line-color': '#E53131',
          'line-width': 2.5
      },
  },
firstSymbolId0);

map.on('click', 'Site Boundary', function(e) {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    // .setHTML(
    //   "District: "
    //   + "<strong>"
    //   + e.features[0].properties.supervisor
    //   + "</strong>"
    //   + "<br>"
    //   + "Name: "
    //   + "<strong>"
    //   + e.features[0].properties.supname)
    .addTo(map);
});


//To load layers:
// 1.ALL PARCELS: https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191219_SOMA_PRCL.geojson
// 2.DEV PIPELINE PARCELS:
// 3.NOT IN PIPELINE PRCLS: https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191220_SOMA_NOPIPE_13-19_ASSR_JOINED_N.geojson
// 4.ML PRCLS:


  // Find the index of the first symbol layer in the map style, so that the layer added can below the basemap object
  var firstSymbolId1;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId1 = layers[i].id;
      break;
      }
    }
  map.addLayer({
      'id': 'Parcels in Development Pipeline',
      'type': 'fill',
      'source': {
            'type': 'geojson',
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191220_SOMA_PIPE_PRCL_ASSR_JOINED_N.geojson'
            // 'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/2019_Q1Q2_MERGE.geojson'
      },

      'layout': {
          'visibility': 'none'
      },
      'paint': {

        'fill-color': '#54BDE7',
        'fill-opacity': 0.4

        // 'circle-radius': 3,
        // 'circle-color': '#54BDE7',
        // 'fill-opacity': 0.05,
        // 'opacity': 0.5,
      },
  }, firstSymbolId1);

  //add popup to the model 1 prediction parcels
  map.on('click', 'Parcels in Development Pipeline', function(e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<strong>2012 Q1</strong>"
        + "<br>"
        + "<br>"
        + "Block-lot number: "
        + "<strong>"
        + e.features[0].properties.blklot
        + "</strong>"
        + "<br>"
        // + "Address: "
        // + "<strong>"
        // + e.features[0].properties.location_1_address
        // + "</strong>"
        // + "<br>"
        + "Zoning: "
        + "<strong>"
        + e.features[0].properties.Zoning_Code
        + "</strong>"
        + "<br>"
        + "Land Use: "
        + "<strong>"
        + e.features[0].properties.Use_Code
        + "</strong>")
      .addTo(map);
  });

// 2019 Q2 dev pipeline parcels
// https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/SF%20Development%20Pipeline%202019%20Q2.geojson

// create slider for parcels properties
var slider = document.getElementById('slider');
var sliderValue = document.getElementById('slider-value');

// map.on('load', function() {
// 		map.addLayer({
//         'id': 'scores',
//         'type': 'circle',
//         'source': {
//           'type': 'geojson',
//           'data': 'https://rawgit.com/wboykinm/be013c300ee9a6e0cea2897a9de56fb3/raw/72319ef9a549634360cc6b6186fc81357fe8385f/chicago.geojson'
//         },
//         'paint': {
//             'circle-radius': [
//                 'step',
//                 ['get', 'value'],
//                 6, 0.7,
//                 16
//             ],
//             'circle-color': [
//                 'step',
//                 ['get', 'value'],
//                 '#fff', 0.7,
//                 '#B26BFB'
//             ]
//         }
//     });
//
//     slider.addEventListener('input', function(e) {
//         map.setPaintProperty('scores', 'circle-color', [ 'step', ['get', 'value'], '#fff', parseFloat(e.target.value, 1), '#B26BFB' ]);
//         map.setPaintProperty('scores', 'circle-radius', [ 'step', ['get', 'value'], 6, parseFloat(e.target.value, 1), 16 ]);
//         sliderValue.textContent = e.target.value;
//     });
// });


var firstSymbolI5;
for (var i = 0; i < layers.length; i++) {
  if (layers[i].type === 'symbol') {
    firstSymbolId15 = layers[i].id;
    break;
    }
  }
map.addLayer({
    'id': '2019 Q1Q2 Development Pipeline',
    'type': 'circle',
    'source': {
          'type': 'geojson',
          'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/2019_Q1Q2_MERGE.geojson'
    },

    'layout': {
        'visibility': 'none'
    },
    'paint': {

      //testing the circle radius slider
      // 'circle-radius': [
      //           'step',
      //           ['get', 'supedist'],
      //           6, 0.7,
      //           16
      //       ],
      // 'circle-color': [
      //           'step',
      //           ['get', 'supedist'],
      //           '#fff', 0.7,
      //           '#B26BFB'
      //       ]

      'circle-radius': 3,
      'circle-color': '#76D7C4',

    },
}, firstSymbolId15);

// slider.addEventListener('input', function(e) {
//     map.setPaintProperty('2019 Q1Q2 Development Pipeline', 'circle-color', [ 'step', ['get', 'supedist'], '#fff', parseFloat(e.target.supedist, 1), '#B26BFB' ]);
//     map.setPaintProperty('2019 Q1Q2 Development Pipeline', 'circle-radius', [ 'step', ['get', 'supedist'], 6, parseFloat(e.target.supedist, 1), 16 ]);
//     sliderValue.textContent = e.target.value;
// });


//add popup to the model 1 prediction parcels
map.on('click', '2019 Q1Q2 Development Pipeline', function(e) {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<strong>2012 Q1</strong>"
      + "<br>"
      + "<br>"
      + "Block-lot number: "
      + "<strong>"
      + e.features[0].properties.blklot
      + "</strong>"
      + "<br>"
      + "Address: "
      + "<strong>"
      + e.features[0].properties.nameaddr
      + "</strong>"
      + "<br>"
      // + "Zoning: "
      // + "<strong>"
      // + e.features[0].properties.zoning
      // + "</strong>"
      // + "<br>"
      + "Land Use: "
      + "<strong>"
      + e.features[0].properties.project_type
      + "</strong>"
      + "<br>"
      + "Project Year: "
      + "<strong>"
      + e.features[0].properties.year
      + "</strong>")
    .addTo(map);
});


  //show the not in pipeline parcels:
  //DOWNLOAD THE NO PIPE PARCELS FOR FILTERING USE
  //AJAX Maybe not working here for mapbox maps
    // $(document).ready(function(){
    //   $.ajax(prcl_nopipe).done(function(data) {
    //     parsedData00 = JSON.parse(data);
    //     console.log(parsedData00);
    //     var layerMappedPolygons = L.geoJson(parsedData00,
    //       {
    //         style: {opacity:0.4,width:0.5,color:'#E0903F'},
    //         type: "fill",
    //         pointToLayer: function (feature, latlng) {
    //           return new L.Polygon(latlng, {
    //
    //           });
    //         },
    //
    //         onEachFeature: function(feature,layer){
    //
    //           layer.bindPopup(
    //             "Parcel id: "
    //             + "<strong>"
    //             + feature.properties.blklot
    //             + "</strong>"
    //             + "<br>"
    //             + "Zoning Code: "
    //             + "<strong>"
    //             + feature.properties.Zoning_Code
    //             + "</strong>"
    //             + "<br>"
    //             + "Area: "
    //             + "<strong>"
    //             + feature.properties.Lot_Area
    //             + "</strong>"
    //             + "<br>"
    //             + "Neighborhood: "
    //             + "<strong>"
    //             + feature.properties.Analysis_Neighborhood
    //             + "</strong>"
    //             + "<br>"
    //             + "Existing Use: "
    //             + "<strong>"
    //             + feature.properties.Use_Code
    //             + "</strong>"
    //             + "<br>"
    //             + "Land Value: "
    //             + "<strong>"
    //             + feature.properties.Ass_Land_Val
    //             + "</strong>")
    //          }
    //         }).addTo(map);
    //         layerMappedPolygons.eachLayer(eachFeatureFunction);
    //       })
    //     });

// Potential parcels not in pipeline

  var firstSymbolId2;

// // create slider for parcels properties
// var slider = document.getElementById('slider');
// var sliderValue = document.getElementById('slider-value');

// map.on('load', function() {
// 		// map.addLayer({
//     //     'id': 'scores',
//     //     'type': 'circle',
//     //     'source': {
//     //       'type': 'geojson',
//     //       'data': 'https://rawgit.com/wboykinm/be013c300ee9a6e0cea2897a9de56fb3/raw/72319ef9a549634360cc6b6186fc81357fe8385f/chicago.geojson'
//     //     },
//     //     'paint': {
//     //         'circle-radius': [
//     //             'step',
//     //             ['get', 'value'],
//     //             6, 0.7,
//     //             16
//     //         ],
//     //         'circle-color': [
//     //             'step',
//     //             ['get', 'value'],
//     //             '#fff', 0.7,
//     //             '#B26BFB'
//     //         ]
//     //     }
//     // });
//
//     // slider.addEventListener('input', function(e) {
//     //     map.setPaintProperty('Parcels not in pipeline', 'fill-color', [ 'step', ['get', 'Lot_Area'], '#fff', parseFloat(e.target.Lot_Area, 1), '#B26BFB' ]);
//     //     map.setPaintProperty('Parcels not in pipeline', 'fill-opacity', [ 'step', ['get', 'Lot_Area'], 6, parseFloat(e.target.Lot_Area, 1), 1 ]);
//     //     sliderValue.textContent = e.target.Lot_Area;
//     // });
// });



  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId2 = layers[i].id;
      break;
      }
    }

  map.addLayer({
      'id': 'Parcels not in pipeline',
      'type': 'fill',
      'source': {
            'type': 'geojson',
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191220_SOMA_NOPIPE_13-19_ASSR_JOINED_N1.geojson'
            // 'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191110_PRCL_NOPIPE_NORESI_OPSP_CIE_L4000SQFT1_NO2019Q12.geojson'
      },

      'layout': {
          'visibility': 'none'
      },
      'paint': {
          // 'fill-color': 'rgba(87, 94, 98, 0.6)',
          // 'fill-outline-color': 'rgba(36, 68, 89, 1)'

          // '#5DADE2',
          // 'fill-opacity': 0.05,

          'fill-color': '#FBB242',
          'fill-opacity': 0.4
          // 'line-width': 1.2
      },
  },
  firstSymbolId2);


  map.on('click', 'Parcels not in pipeline', function(e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "Parcel id: "
        + "<strong>"
        + e.features[0].properties.blklot
        + "</strong>"
        + "<br>"
        + "Zoning Code: "
        + "<strong>"
        + e.features[0].properties.Zoning_Code
        + "</strong>"
        + "<br>"
        + "Area: "
        + "<strong>"
        + e.features[0].properties.Lot_Area
        + "</strong>"
        + "<br>"
        + "Neighborhood: "
        + "<strong>"
        + e.features[0].properties.Analysis_Neighborhood
        + "</strong>"
        + "<br>"
        + "Existing Use: "
        + "<strong>"
        + e.features[0].properties.Use_Code
        + "</strong>"
        + "<br>"
        + "Land Value: "
        + "<strong>"
        + e.features[0].properties.Ass_Land_Val
        + "</strong>")
      .addTo(map);
  });


var MinArea = 0;
var MaxArea = 0;
var MinLandVal = 0;
var MaxLandVal = 0;
var DistanceToTransit = 0;
var DistanceToPark = 0;


//filtered result:
$("#note").click(function(){
  MinArea = $("#MinArea").val();
  MaxArea = $("#MaxArea").val();
  // var Zoning = $("#Zoning").val();
  MinLandVal = $("#MinLandVal").val();
  MaxLandVal = $("#MaxLandVal").val();
  // var DistanceToTransit = $("#TransitDist").val();
  // var DistanceToPark = $("#ParkDist").val();

  console.log(MinArea);
  console.log(MaxArea);
  // console.log(Zoning);
  // console.log(MinLandVal);
  // console.log(MaxLandVal);
});

$("#find").click(function(){
  console.log(MinArea);
  var MinArea = $("#MinArea").val();
  console.log(MinArea);
  // var MinArea = 2000;
  // console.log(["get", "Lot_Area"]);
  // map.setFilter('Parcels not in pipeline',['>', 'Lot_Area', $('#MinArea').val()]);

  // if (MinArea <= 10000){
  //   filter = []
  // }
  // var filter = ["all",['>', 'Lot_Area', 10000],['<', 'Lot_Area', 200000]];

  // var filter = ["all",['>', 'Lot_Area', ["get", MinArea]]];
  map.setFilter('Parcels not in pipeline',["all",['>', 'Lot_Area', MinArea]);
//   map.setFilter('Parcels not in pipeline',["all",['>', 'Lot_Area', 2000],['<', 'Lot_Area', 15000],['>', 'Ass_Land_Val', 0],['<', 'Ass_Land_Val', 1000000]]);
})



var eachFeatureFunction = function(layer) {

  layer.on('click', function (event) {
    console.log(layer.feature.properties);
         //ZOOM TO THE SELECTED MUNICIPALITY
         map.fitBounds(layer.getBounds(),{
                    padding: [80,80]
                  });
         // order = order + 1;
         // console.log(order);

       //PUSH INTO THE LAYER SELECTION GROUP for COMPARING
       // layerselected.push(layer);
       // console.log(layerselected);

        //HIGHLIGHT THE MAP CLICKED

        layerMappedPolygons.setStyle(fadeout);

        layer.setStyle(highlight);

 }
)};

 var fadeout = {
   'opacity': 0.01,
 };

 var highlight = {
   'color':'#416FEA',
   'opacity': 0.2,
 };




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
            'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191220_PROB_MTH05_SOMA_PRCL_NOPIPE_JOINED_N.geojson'
            // 'data': 'https://raw.githubusercontent.com/wenhaowuuu/development_potential/master/layer_data/20190729_M1_PREDICTED_PRCLS_YES.geojson'
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
        "<strong>Machine Learning Prediction</strong>"
        + "<br>"
        + "<br>"
        + "Block-lot number: "
        + "<strong>"
        + e.features[0].properties.blklot
        + "</strong>"
        + "<br>"
        + "Zoning Code: "
        + "<strong>"
        + e.features[0].properties.Zoning_Code
        + "</strong>"
        + "<br>"
        + "Area: "
        + "<strong>"
        + e.features[0].properties.Lot_Area
        + "</strong>"
        + "<br>"
        + "Neighborhood: "
        + "<strong>"
        + e.features[0].properties.Analysis_NHBD
        + "</strong>"
        + "<br>"
        + "Existing Use: "
        + "<strong>"
        + e.features[0].properties.Use_Code
        + "</strong>"
        + "<br>"
        + "Land Value: "
        + "<strong>"
        + e.features[0].properties.Ass_Land_Val
        + "</strong>"
        + "<br>"
        + "Development Probability: "
        + "<strong>"
        + (e.features[0].properties.Prediction * 100).toFixed(2)
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

    map.addLayer(
      {
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
          'circle-color': '#E74C3C',


        },
        // 'source-layer': 'museum-cusco'
    },

    firstSymbolId7);

    //BART tracks
    var firstSymbolI75;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol') {
        firstSymbolId75 = layers[i].id;
        break;
        }
      }

      map.addLayer(

        {
          'id': 'BART line',
          'type': 'line',
          'source': {
                'type': 'geojson',
                'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20190925_BART_TRACK.geojson'
          },

          'layout': {
              'visibility': 'none'
          },

          'paint': {
            'line-color': '#E74C3C',
            'line-width': 1.5
          },
        },
       firstSymbolId75);


    //BART stations 5min walkshed
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
                'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191124_BART_BUFF_1320FT.geojson'
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


      //BART stations
      var firstSymbolI9;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          firstSymbolId9 = layers[i].id;
          break;
          }
        }

        map.addLayer({
            'id': 'BART 10min Walkshed',
            'type': 'fill',
            'source': {
                  'type': 'geojson',
                  'data': 'https://raw.githubusercontent.com/wenhaowuuu/site_susceptibility/master/layer_data/20191124_BART_BUFF_2640FT.geojson'
            },

            'layout': {
                'visibility': 'none'
            },

            'paint': {
              'fill-color': '#85C1E9',
              'fill-opacity': 0.3


            },
            // 'source-layer': 'museum-cusco'
        }, firstSymbolId9);



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
