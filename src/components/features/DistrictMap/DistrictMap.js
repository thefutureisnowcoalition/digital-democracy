import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import data from "./gz_2010_us_500_11_5m.geojson";

function DistrictMap({locationString = "None"}) {
    // API key is exposed, needs to be fixed
    mapboxgl.accessToken = "pk.eyJ1IjoiaXNhaWFoZnVqaWlicmVzbmloYW4iLCJhIjoiY2w4dWkzdzVkMDQzeTN2bnoyenNic2c1diJ9.0WsMDr0qD_Bq0RWjNxG_yg";
    
    const mapContainer = useRef(null);

    const [map, setMap] = useState(null);
    
    const [lng, setLng] = useState(-98.6);
    const [lat, setLat] = useState(39.8);
    const [zoom, setZoom] = useState(3);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('load', () => {


            // Add source and layer for congressional districts
            map.addSource('districts', {
                type: 'geojson',
                data
            });

            map.addLayer(
                {
                id: 'districts-outline',
                type: 'line',
                source: 'districts',
                paint: {
                    'line-color': '#0080ff',
                    'line-width': 3
                    }
                }
            );
            
            if (locationString != "None") {
                const location = locationString;
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxgl.accessToken}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.features[0]);
                        setLng(data.features[0].center[0]);
                        setLat(data.features[0].center[1]);
                        map.flyTo({
                            center: data.features[0].center,
                            zoom: 9
                            });
                        const marker = new mapboxgl.Marker()
                            .setLngLat(data.features[0].center)
                            .addTo(map);
                    });
            }

            setMap(map);
        
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        
        map.addControl(
            new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
            })
            );

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
          });

        return () => map.remove();
        
    }, []);


    return (
        <div>
            <h3>Distict Map</h3>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" style={{height: "400px" }}/>
        </div>
     );
}

export default DistrictMap;
