import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon, Text, Fill } from 'ol/style';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() vehicle: any[] = [];
  map!: Map;
  vectorSource!: VectorSource;
  apiUrl = `${environment.url_ms_logica}/vehicles`;

  constructor(private webSocketService: WebSocketService, private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeMap();
    this.map.once('rendercomplete', () => {
      this.fetchVehicles();
    }); // Listar vehículos al cargar el mapa

    // Escuchar eventos de WebSocket para actualizaciones en tiempo real
    this.webSocketService.listen('vehicles:update').subscribe(
      (data: any) => {
        console.log('Datos de vehículo recibidos por WebSocket:', data);
        this.updateVehicleMarker(data);
      },
      (error) => {
        console.error('Error en la actualización del WebSocket:', error);
      }
    );

  }

  initializeMap(): void {
    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    this.vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });

    this.map = new Map({
      target: 'ol-map',
      layers: [tileLayer, vectorLayer],
      view: new View({
        center: this.toWebMercator(4.60971, -74.08175), // Bogotá como centro inicial
        zoom: 7, // Zoom más cercano
      }),
    });

    setTimeout(() => {
      this.map.updateSize(); // Recalcula el tamaño del mapa
    }, 500);

  }

  fetchVehicles(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((vehicles) => {
      const validVehicles = vehicles.filter(vehicle => vehicle.latitude && vehicle.longitude && vehicle.id);
      console.log('Vehículos válidos obtenidos del API:', validVehicles);

      validVehicles.forEach((vehicle) => {
        this.addOrUpdateMarker(vehicle);
      });

      console.log('Total de marcadores tras agregar:', this.vectorSource.getFeatures().length);

      setTimeout(() => {
        this.map.updateSize(); // Asegura el redibujado del mapa
      }, 500);
    });
  }




  updateVehicleMarker(data: any): void {
    this.addOrUpdateMarker(data); // Actualizar o agregar marcador
  }

  addOrUpdateMarker(vehicle: any): void {
    const featureId = `vehicle-${vehicle.id}`;

    const existingFeature = this.vectorSource.getFeatureById(featureId);

    if (existingFeature) {
      console.log(`Actualizando marcador para vehículo ID=${vehicle.id}`);
      existingFeature.setGeometry(new Point(this.toWebMercator(vehicle.latitude, vehicle.longitude)));
    } else {
      console.log(`Creando nuevo marcador para vehículo ID=${vehicle.id}`);
      const feature = new Feature({
        geometry: new Point(this.toWebMercator(vehicle.latitude, vehicle.longitude)),
      });

      feature.setId(featureId);

      feature.setStyle(
        new Style({
          image: new Icon({
            src: './assets/img/icons/common/delivery.png',
            scale: 0.07, // Ajusta el tamaño del ícono
            anchor: [0.5, 1], // Ajusta la posición del ícono
          }),
          text: new Text({
            text: vehicle.plate, // Mostrar la placa del vehículo
            font: '14px Arial bold',
            fill: new Fill({
              color: '#000', // Color del texto
            }),
            offsetY: -50, // Mueve el texto encima del ícono
          }),
        })
      );

      this.vectorSource.addFeature(feature);
      console.log(`Total de marcadores tras agregar: ${this.vectorSource.getFeatures().length}`);
    }
  }



  toWebMercator(lat: number, lon: number): [number, number] {
    const x = lon * 20037508.34 / 180;

    // Limita la latitud al rango válido de Web Mercator para evitar errores
    const clampedLat = Math.max(Math.min(lat, 89.9), -89.9);
    const radLat = (clampedLat * Math.PI) / 180;
    const y = Math.log(Math.tan(Math.PI / 4 + radLat / 2)) * (20037508.34 / Math.PI);

    console.log(`Lat/Lon: (${lat}, ${lon}) => WebMercator: (${x}, ${y})`);
    return [x, y];
  }



}
