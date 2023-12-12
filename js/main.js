require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/Editor",
    "esri/widgets/LayerList",
    "esri/layers/GraphicsLayer",
    "esri/layers/CSVLayer",
    "esri/layers/GroupLayer"
    ], function(
    esriConfig, 
    Map, 
    MapView,
    Locate,
    Search,
    BasemapGallery,
    Expand,
    FeatureLayer,
    Legend,
    Editor,
    LayerList,
    GraphicsLayer,
    CSVLayer,
    GroupLayer
    ) {
      //ApiKey and set up map
      esriConfig.apiKey = "AAPKc4815fc789554ea59e6bb2ab1478b72bmlxdJS-1QcPLKZecWTuttzVx8DqxI-DyY1cjC2xlndzUvbTSpip5RoBr-fG7wdvn";
      const map = new Map({ 
        basemap: "arcgis-topographic" // Basemap layer service
      });
      const view = new MapView({
        map: map,
        center: [-98.5795, 39.828175], // Longitude, latitude
        zoom: 5, // Zoom level
        container: "viewDiv" // Div element
      });
      
      //Locate widget
      let locateWidget = new Locate({
        view: view
      });
      view.ui.add(locateWidget, "top-left");
      const searchWidget = new Search({
        view: view
      });

      //Search widget
      view.ui.add(searchWidget, {
        position: "top-left",
        index: 1
      });

      //Basemap gallery
      const basemapGallery = new BasemapGallery({
        view: view,
        container: document.createElement("BasemapGallerydiv")
      });
      const bgExpand = new Expand({
        view: view,
        content: basemapGallery
      });
      view.ui.add(bgExpand, "top-left");

      //Government Land popup
      const popupusaGovernmentLand = {
        "title": "{Loc_Nm}",
        "content": "<b>Owner:</b> {Loc_Own}<br><b>Manager:</b> {Loc_Mang}<br><b>Designation Type:</b> {Des_Tp}"
      };
      //Government Land feature layer
      const usaGovernmentLandLayer = new FeatureLayer({
        url: "https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/Manager_Name/FeatureServer",
        outFields: ["Loc_Nm", "Loc_Own", "Loc_Mang", "Des_Tp"],
        popupTemplate: popupusaGovernmentLand,
        opacity: 0.25,
        title: "Protected Areas Database of the United States (by the USGS)"
      });
      map.add(usaGovernmentLandLayer);

      usaGovernmentLandLayer.visible = false

      //Mine and mineral plant popup
      const mineplantsPop = {
        "title": "{SITE_NAME}",
        "content": "<b>Commodity Type:</b> {COMMODITY}<br><b>Company:</b> {COMPANY_NA}"
      };

      //mineplants renderer
      let mineplantsRender = {
        type: "simple",
        symbol: {
          type: "simple-marker",
          style: "square",
          size: 6,
          color: [35, 110, 66], //Green
          outline: {
            width: 0.5,
            color: "black"
          }
        }
      };

      //Mine and mineral plant feature class
      const mineplants = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG576_FinalData/FeatureServer",
        outFields: ["COMMODITY", "SITE_NAME", "COMPANY_NA"],
        popupTemplate: mineplantsPop,
        renderer: mineplantsRender,
        title: "Active Mines and Mineral Plants in the US"
      });
      map.add(mineplants);

      const mineplantsInfos = {
        layer: mineplants
      }

      //Setup editor for mineplants feature class
      const editor = new Editor({
        view: view,
        layerInfos: [mineplantsInfos],
        container: document.createElement("editor")
      }); 
      const edExpand = new Expand({
        view: view,
        content: editor
      });
      view.ui.add(edExpand, "top-right");

      //Layerlist
      let layerList = new LayerList({
        view: view,
        container: document.createElement("layerList")
      });
      const listExpand = new Expand({
        view: view,
        content: layerList
      });
      view.ui.add(listExpand, "bottom-left");

      view.ui.add("optionsDiv", "bottom-left");

      let query = mineplants.createQuery();

      var resultsLayer = new GraphicsLayer({
        title: "Query"
      });

      // when query type changes, set appropriate values
      const queryOpts = document.getElementById("query-type");

      queryOpts.addEventListener("change", () => {
        switch (queryOpts.value) {
          // values set based on mineplants COMMODITY
          case "Aluminum":
            query.where = "COMMODITY = 'Aluminum'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break
          case "Antimony":
            query.where = "COMMODITY = 'Antimony'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Ball Clay":
            query.where = "COMMODITY = 'Ball Clay'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Barite":
            query.where = "COMMODITY = 'Barite'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Bentonite":
            query.where = "COMMODITY = 'Bentonite'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Beryllium":
            query.where = "COMMODITY = 'Beryllium'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Boron":
            query.where = "COMMODITY = 'Boron'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Bromine":
            query.where = "COMMODITY = 'Bromine'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break
          case "Cadium":
            query.where = "COMMODITY = 'Cadium'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Cement":
            query.where = "COMMODITY = 'Cement'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Chromium":
            query.where = "COMMODITY = 'Chromium'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Cobalt":
            query.where = "COMMODITY = 'Cobalt'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Columbium":
            query.where = "COMMODITY = 'Columbium'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Columbium and(or) tantalum":
            query.where = "COMMODITY = 'Columbium and(or) tantalum'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Common Clay and Shale":
            query.where = "COMMODITY = 'Common Clay and Shale'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break
          case "Copper":
            query.where = "COMMODITY = 'Copper'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Crushed Stone":
            query.where = "COMMODITY = 'Crushed Stone'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Diatomite":
            query.where = "COMMODITY = 'Diatomite'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Dimension Stone":
            query.where = "COMMODITY = 'Dimension Stone'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Feldspar":
            query.where = "COMMODITY = 'Feldspar'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Fullers Earth":
            query.where = "COMMODITY = 'Fullers Earth'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Garnet":
            query.where = "COMMODITY = 'Garnet'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break
          case "Gemstones":
            query.where = "COMMODITY = 'Gemstones'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Germanium":
            query.where = "COMMODITY = 'Germanium'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Gold":
            query.where = "COMMODITY = 'Gold'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Gypsum":
            query.where = "COMMODITY = 'Gypsum'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Iodine":
            query.where = "COMMODITY = 'Iodine'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Iron Oxide Pigments":
            query.where = "COMMODITY = 'Iron Oxide Pigments'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Kaolin":
            query.where = "COMMODITY = 'Kaolin'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break
          case "Kyanite":
            query.where = "COMMODITY = 'Kyanite'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Lead":
            query.where = "COMMODITY = 'Lead'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Lime":
            query.where = "COMMODITY = 'Lime'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Lithium":
            query.where = "COMMODITY = 'Lithium'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Magnesium Compounds":
            query.where = "COMMODITY = 'Magnesium Compounds'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Magnesium Metal":
            query.where = "COMMODITY = 'Magnesium Metal'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Manganese":
            query.where = "COMMODITY = 'Manganese'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break
          case "Mica":
            query.where = "COMMODITY = 'Mica'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Molybdenum":
            query.where = "COMMODITY = 'Molybdenum'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Nickel":
            query.where = "COMMODITY = 'Nickel'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Olivine":
            query.where = "COMMODITY = 'Olivine'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Peat":
            query.where = "COMMODITY = 'Peat'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Perlite":
            query.where = "COMMODITY = 'Perlite'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Phosphate":
            query.where = "COMMODITY = 'Phosphate'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break
          case "Potash":
            query.where = "COMMODITY = 'Potash'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Pumice":
            query.where = "COMMODITY = 'Pumice'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Pyrophyllite":
            query.where = "COMMODITY = 'Pyrophyllite'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Rhenium":
            query.where = "COMMODITY = 'Rhenium'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Salt":
            query.where = "COMMODITY = 'Salt'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Sand and Gravel":
            query.where = "COMMODITY = 'Sand and Gravel'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Selenium":
            query.where = "COMMODITY = 'Selenium'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break
          case "Silica":
            query.where = "COMMODITY = 'Silica'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Silicon":
            query.where = "COMMODITY = 'Silicon'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Silver":
            query.where = "COMMODITY = 'Silver'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Soda Ash":
            query.where = "COMMODITY = 'Soda Ash'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Sodium Sulfate":
            query.where = "COMMODITY = 'Sodium Sulfate'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Strontium":
            query.where = "COMMODITY = 'Strontium'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Sulfur":
            query.where = "COMMODITY = 'Sulfur'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Talc":
            query.where = "COMMODITY = 'Talc'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Titanium Dioxide Pigment":
            query.where = "COMMODITY = 'Titanium Dioxide Pigment'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break
          case "Titanium Metal":
            query.where = "COMMODITY = 'Titanium Metal'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Titanium Minerals":
            query.where = "COMMODITY = 'Titanium Minerals'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Trona":
            query.where = "COMMODITY = 'Trona'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Tungsten":
            query.where = "COMMODITY = 'Tungsten'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Vermiculite":
            query.where = "COMMODITY = 'Vermiculite'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Wollastonite":
            query.where = "COMMODITY = 'Wollastonite'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Zeolites":
            query.where = "COMMODITY = 'Zeolites'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Zinc":
            query.where = "COMMODITY = 'Zinc'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          case "Zircon":
            query.where = "COMMODITY = 'Zircon'";
            query.outFields = ["COMMODITY", "SITE_NAME", "COMPANY_NA"];
            query.returnGeometry = true;
            queryFeat().then(updateMap);
            break;
          default:
            map.remove(resultsLayer);
            map.add(mineplants);   
        }
      });

      //Query the map
      function queryFeat() {
        return mineplants.queryFeatures(query)
      };

      //Update the map based on the query
      function updateMap(response) {
        resultsLayer.removeAll();
        var features = response.features.map(function(graphic) {
          graphic.popupTemplate = mineplantsPop;
          graphic.symbol = {
            "type": "simple-marker",
            style: "square",
            color: [35, 110, 66], //Green
            outline: { 
                color: [0, 0, 0], //Black 
                width: 1
            }, 
            "width": "24px",
            "height": "24px"
          };
          return graphic;
        });
        map.remove(mineplants);
        var features = response.features;
        resultsLayer.addMany(features);
        map.addMany([resultsLayer]);
      };

      //Legend and its expand container
      let legend = new Legend({
        view: view,
        container: document.createElement("legend")
      });
      const lgExpand = new Expand({
        view: view,
        content: legend
      });
      view.ui.add(lgExpand, "bottom-right");

      //USMIN popup template
      const USMINPop = {
        "title": "{Ftr_Name}",
        "content": "<b>Commodity Type:</b> {Commodity}<br><b>Type of mine, mineral occurrence, or mineral region feature:</b> {Ftr_Type}<br><b>Feature group:</b> {Ftr_Group}<br><b>Point definition from source report or approximated by authors:</b> {Pt_Def}"
      };

      //USMIN renderer
      let USMINRender = {
        type: "simple",
        symbol: {
          type: "simple-marker",
          style: "triangle",
          size: 12,
          color: [195, 77, 204], //Purple
          outline: {
            width: 0.5,
            color: "black"
          }
        }
      };

      //Copper Mineral Deposits
      const CobaltLayer = new CSVLayer({
        url: "/Cobalt_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Cobalt USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Gallium Mineral Deposits
      const GalliumLayer = new CSVLayer({
        url: "/Gallium_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Gallium USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Germanium Mineral Deposits
      const GermaniumLayer = new CSVLayer({
        url: "/Germanium_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Germanium USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Graphite Mineral Deposits
      const GraphiteLayer = new CSVLayer({
        url: "/Graphite_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Graphite USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Indium Mineral Deposits
      const IndiumLayer = new CSVLayer({
        url: "/Indium_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Indium USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Lithium Mineral Deposits
      const LithiumLayer = new CSVLayer({
        url: "/Lithium_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Lithium USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Niobium Mineral Deposits
      const NiobiumLayer = new CSVLayer({
        url: "/Niobium_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Niobium USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Rare Earth Elements Mineral Deposits
      const RareEarthElementsLayer = new CSVLayer({
        url: "/RareEarthElements_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Rare Earth Elements USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Rhenium Mineral Deposits
      const RheniumLayer = new CSVLayer({
        url: "/Rhenium_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Rhenium USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Tantalum Mineral Deposits
      const TantalumLayer = new CSVLayer({
        url: "/Tantalum_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Tantalum USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Tellurium Mineral Deposits
      const TelluriumLayer = new CSVLayer({
        url: "/Tellurium_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Tellurium USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Tin Mineral Deposits
      const TinLayer = new CSVLayer({
        url: "/Tin_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Tin USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Tungsten Mineral Deposits
      const TungstenLayer = new CSVLayer({
        url: "/Tungsten_Loc_Pt.csv",
        copyright: "USGS USMIN",
        latitudeField: "Lat_WGS84",
        longitudeField: "Long_WGS84",
        title: "Tungsten USMIN Mineral Deposit",
        outFields: ["Ftr_Name", "Ftr_Group", "Ftr_Type", "Commodity", "Pt_Def"],
        popupTemplate: USMINPop,
        renderer: USMINRender
      });

      //Combines all csv layers into a group layer and adds all to map
      const USMIN_Mineral_Deposit = new GroupLayer({
        title: "USMIN Mineral Deposits",
        visible: false,
        visibilityMode: "exclusive",
        layers: [TungstenLayer, TinLayer, TelluriumLayer, TantalumLayer, RheniumLayer, RareEarthElementsLayer, NiobiumLayer, LithiumLayer, IndiumLayer, GraphiteLayer, GermaniumLayer, GalliumLayer, CobaltLayer]
      });
      map.add(USMIN_Mineral_Deposit)
    }); 