import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapsService } from 'app/services/maps/maps.service';
import 'leaflet';
import 'leaflet-routing-machine';
import 'beautifymarker';
import 'leaflet-tag-filter-button/src/leaflet-tag-filter-button.js';
import 'leaflet-easybutton/src/easy-button.js';
import "leaflet-easybutton";
import { GetData } from 'app/services/maps/models/get-data';
import { NotificationsResult } from 'app/services/maps/models/notifications-result';
declare let L;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  map;
  @ViewChild('mapElement', {static: false}) mapElement: ElementRef;
  locations: any;
  timestamp: any;
  notificationsResult: NotificationsResult [] = [];
  

  // Define our base layers so we can reference them multiple times
  countryMaps = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
  });

  markers = L.markerClusterGroup({ animateAddingMarkers: true });
  statusFilterButton:any;
  
  markersList = [];

  Nivel6 = {
    icon: 'ambulance'
    , iconShape: 'marker', iconSize: [50, 50]
    , borderColor: 'White'
    , textColor: 'White', backgroundColor: 'darkblue'
    , innerIconStyle: 'font-size:25px;padding-top:7px;'
  };
  Nivel5 = {
    icon: 'ambulance'
    , iconShape: 'marker', iconSize: [50, 50]
    , borderColor: 'White'
    , textColor: 'White', backgroundColor: '#75158a'
    , innerIconStyle: 'font-size:25px;padding-top:7px;'
  };
  Nivel4 = {
    icon: 'medkit'
    , iconShape: 'marker', iconSize: [50, 50]
    , borderColor: 'White'
    , textColor: 'White', backgroundColor: 'Red'
    , innerIconStyle: 'font-size:25px;padding-top:7px;'
  };
  Nivel3 = {
    icon: 'medkit'
    , iconShape: 'marker', iconSize: [50, 50]
    , borderColor: 'White'
    , textColor: 'White', backgroundColor: 'Orange'
    , innerIconStyle: 'font-size:25px;padding-top:7px;'
  };
  Nivel2 = {
    icon: 'medkit'
    , iconShape: 'marker', iconSize: [50, 50]
    , borderColor: 'White'
    , textColor: 'White', backgroundColor: 'goldenrod'
    , innerIconStyle: 'font-size:25px;padding-top:7px;'
  };
  Nivel1 = {
    icon: 'medkit'
    , iconShape: 'marker', iconSize: [50, 50]
    , borderColor: 'White'
    , textColor: 'White', backgroundColor: 'limegreen'
    , innerIconStyle: 'font-size:25px;padding-top:7px;'
  };


  layerControl1 = L.Control.TagFilterButton.include({
    // Goal: read from MCG instead of from _map
    enableMCG: function (mcgInstance) {
      this.registerCustomSource({
        name: 'mcg',
        source: {
          mcg: mcgInstance,
          hide: function (layerSource) {
            let releatedLayers = [];

            console.log('this._releatedFilterButtons', this._releatedFilterButtons)
            for (let r = 0; r < this._releatedFilterButtons.length; r++) {
              releatedLayers = releatedLayers.concat(
                this._releatedFilterButtons[r].getInvisibles()
              );
            }

            let toBeRemovedFromInvisibles = [], i, toAdd = [];

            for (let i = 0; i < this._invisibles.length; i++) {
              if (releatedLayers.indexOf(this._invisibles[i]) == -1) {
                for (let j = 0; j < this._invisibles[i].options.tags.length; j++) {
                  if (this._selectedTags.length == 0 || this._selectedTags.indexOf(this._invisibles[i].options.tags[j]) !== -1) {
                    //this._map.addLayer(this._invisibles[i]);
                    toAdd.push(this._invisibles[i]);
                    toBeRemovedFromInvisibles.push(i);
                    break;
                  }
                }
              }
            }

            // Batch add into MCG
            layerSource.mcg.addLayers(toAdd);

            while (toBeRemovedFromInvisibles.length > 0) {
              this._invisibles.splice(
                toBeRemovedFromInvisibles.pop(),
                1
              );
            }

            let removedMarkers = [];
            let totalCount = 0;

            console.log('if this._selectedTags', this._selectedTags)
            if (this._selectedTags.length > 0) {
              //this._map.eachLayer(
              console.log('layerSource.mcg', layerSource.mcg)
              layerSource.mcg.eachLayer(
                function (layer) {
                  console.log('layer.options.tags', layer.options.tags)
                  if (layer && layer.options && layer.options.tags ) {
                    totalCount++;
                    if (releatedLayers.indexOf(layer) == -1) {
                      let found = false;
                      console.log('layer.options.tags.length', layer.options.tags.length)
                      
                      for (let i = 0; i < layer.options.tags.length; i++) {
                        console.log('this._selectedTags.indexOf',this._selectedTags.indexOf(layer.options.tags[i]))
                      console.log('this._selectedTags.indexOf',(this._selectedTags.indexOf(layer.options.tags[i]) !== -1))
                        found = this._selectedTags.indexOf(layer.options.tags[i]) !== -1;
                        if (found) {
                          console.log('found', found)
                          break;
                        }
                      }
                      if (!found) {
                        removedMarkers.push(layer);
                      }
                    }
                  }
                }.bind(this)
              );

              for (i = 0; i < removedMarkers.length; i++) {
                //this._map.removeLayer(removedMarkers[i]);
                this._invisibles.push(removedMarkers[i]);
              }

              // Batch remove from MCG
              layerSource.mcg.removeLayers(removedMarkers);
            }
            console.log('removedMarkers.length', removedMarkers.length)
            console.log('total', (totalCount - removedMarkers.length))
            return totalCount - removedMarkers.length;
          },
        },
      });

      this.layerSources.currentSource = this.layerSources.sources['mcg'];
    },
  });

  ////////////////////////////////////////////////
  // Fix for TagFilterButton
  ////////////////////////////////////////////////
  layersControl2 =  L.Control.TagFilterButton.include({
    _prepareLayerSources: function () {
      console.log('_prepareLayerSources');
      this.layerSources = new Object();
      this.layerSources['sources'] = new Object();

      
      this.registerCustomSource({
        name: 'default',
        source: {
          hide: function () {
            let releatedLayers = [];
            console.log('this._releatedFilterButtons', this._releatedFilterButtons)
            for (let r = 0; r < this._releatedFilterButtons.length; r++) {
              releatedLayers = releatedLayers.concat(
                this._releatedFilterButtons[r].getInvisibles()
                
              );
              console.log('this._releatedFilterButtons[r]', this._releatedFilterButtons[r])
              console.log('this._releatedFilterButtons[r].getInvisibles()', this._releatedFilterButtons[r].getInvisibles())
            }

            let toBeRemovedFromInvisibles = [], i;

            // "Fix": add var
            for (let i = 0; i < this._invisibles.length; i++) {
              if (releatedLayers.indexOf(this._invisibles[i]) == -1) {
                // "Fix": add var
                for (let j = 0; j < this._invisibles[i].options.tags.length; j++) {
                  if (
                    this._selectedTags.length == 0 ||
                    this._selectedTags.indexOf(
                      this._invisibles[i].options.tags[j]
                    ) !== -1
                  ) {
                    this._map.addLayer(this._invisibles[i]);
                    toBeRemovedFromInvisibles.push(i);
                    break;
                  }
                }
              }
            }

            while (toBeRemovedFromInvisibles.length > 0) {
              this._invisibles.splice(toBeRemovedFromInvisibles.pop(), 1);
            }

            let removedMarkers = [];
            let totalCount = 0;

            if (this._selectedTags.length > 0) {
              this._map.eachLayer(
                function (layer) {
                  if (layer && layer.options && layer.options.tags) {
                    totalCount++;
                    if (releatedLayers.indexOf(layer) == -1) {
                      let found = false;
                      for (let i = 0; i < layer.options.tags.length; i++) {
                        found =
                          this._selectedTags.indexOf(layer.options.tags[i]) !==
                          -1;
                        if (found) {
                          break;
                        }
                      }
                      if (!found) {
                        removedMarkers.push(layer);
                      }
                    }
                  }
                }.bind(this)
              );

              for (i = 0; i < removedMarkers.length; i++) {
                this._map.removeLayer(removedMarkers[i]);
                this._invisibles.push(removedMarkers[i]);
              }
            }

            return totalCount - removedMarkers.length;
          },
        },
      });
      console.log(this.registerCustomSource);
      this.layerSources.currentSource = this.layerSources.sources['default'];
    },
  });

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [
      this.countryMaps,
      this.markers
    ],
    zoom: 6.46,
    center: L.latLng([-17.047501, -64.899520,])
  };


  constructor(public mapsService: MapsService) {
    
  }

  ngOnInit(): void {
    
  }

  ngAfterContentInit() {
    
    this.loadMap();
  }

  async loadMap() {
    await setTimeout(() => {
      this.map = new L.map(this.mapElement.nativeElement)
      this.countryMaps.addTo(this.map);
      this.map.setView(new L.LatLng(-17.047501, -64.899520), 6.46);
    }, 2000);
    
    await this.mapsService.getLocations().subscribe(data => {
      this.locations = data;
      let i;
      
      for (i = 0; i < this.locations.length; i++) {
        let m:any = L.marker(
          [this.locations[i].latitud, this.locations[i].longitud],
          { 
            icon: L.BeautifyIcon.icon(this.LogoNivel(this.locations[i].nivel)),
            draggable: false,
            tags: ['Nivel ' + this.locations[i].nivel]
          }
        ).bindPopup(`<form>
                <label>CI: ` + this.locations[i].ci + `</label>
                <br />
                <label>Numero Contacto: ` + this.locations[i].numeroContacto + `</label>
                <br/>
                <label>Fecha: ` + this.locations[i].fechaHoraRegistro + `</label>
                <br/>
              </form>`);
        m.name = this.locations[i].numeroContacto;
        this.Remover(this.locations[i].numeroContacto);
        this.markers.addLayer(m);
        
      }

      this.map.addLayer(this.markers);
      this.statusFilterButton = L.control.tagFilterButton({
        data: ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4', 'Nivel 6'],
        //data: ['1', '2', '3', '4', '6'],
        filterOnEveryClick: true,
        icon: '<img src="/assets/img/filter.png">',
      }).addTo(this.map)

      this.statusFilterButton.enableMCG(this.markers);
      //statusFilterButton.addTo(this.map)
      this.timestamp = Math.round((new Date()).getTime() / 1000);

      setInterval(() => {this.myTimer();}, 15000);
    });
  }

  myTimer() {
    this.mapsService.getLocationsByTime(this.timestamp).subscribe(data => {
      this.locations = data;
      if (this.locations.length > 0) {
        let i;
        for (i = 0; i < this.locations.length; i++) {
          // this.addNotification(this.locations);
          let m = L.marker(
                [this.locations[i].latitud, this.locations[i].longitud],
                { icon: L.BeautifyIcon.icon(this.LogoNivel(this.locations[i].nivel)), draggable: false }
              ).bindPopup(`<form>
                      <label>CI: ` + this.locations[i].ci + `</label>
                      <br />
                      <label>Numero Contacto: ` + this.locations[i].numeroContacto + `</label>
                      <br/>
                      <label>Fecha: ` + this.locations[i].fechaHoraRegistro + `</label><br/>
                    </form>`);
          m.name = this.locations[i].numeroContacto;
          this.Remover(this.locations[i].numeroContacto);
          this.markers.addLayer(m);
        }
        this.timestamp = Math.round((new Date()).getTime()/* / 1000*/);
      }
    })
  }

  addNotification(){
    
    let noFound = false;
    let item = {
      ci: 'Reservado',
      fechaHoraRegistro: '2020-04-03T00:00:00',
      latitud: -16.530461,
      longitud: -68.073476,
      nivel: '6',
      numeroContacto: 'Registro Reservado',
    };
    console.log(this.indexOfExt(this.notificationsResult, item));
    noFound = this.indexOfExt(this.notificationsResult, item) !== -1;
    if(!noFound){
      this.notificationsResult.push({
        id: 2,
        ci: 'Reservado',
        fechaHoraRegistro: '2020-04-03T00:00:00',
        nivel: '6',
        numeroContacto: 'Registro Reservado',
      })
    }
    console.log(this.notificationsResult)
    
  }
  indexOfExt(notifications: any, item: { ci: string; fechaHoraRegistro: string; latitud: number; longitud: number; nivel: string; numeroContacto: string; }): any {
    throw new Error("Method not implemented.");
  }

  LogoNivel(Nivel) {
    switch (Nivel) {
      case '1':
        return this.Nivel1;
        break;
      case '2':
        return this.Nivel2;
        break;
      case '3':
        return this.Nivel3;
        break;
      case '4':
        return this.Nivel4;
        break;
      case '5':
        return this.Nivel5;
        break;
      case '6':
        return this.Nivel6;
        break;
    }

  }

  Remover(contacto) {
    this.markers.eachLayer((layer: any) => {
      if ((layer.name && layer.name === contacto && layer.name !== 'Registro Reservado')) {
        this.markers.removeLayer(layer)
      }
    });
  }
}

