"use client"

import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Button } from './ui/button'
import { Locate, Map as MapIcon } from 'lucide-react'

interface LocationPickerProps {
  direccion: string
  onDireccionChange: (direccion: string, coordinates: { lat: number, lng: number }) => void
}

const containerStyle = {
  width: '100%',
  height: '400px'
}

const defaultCenter = {
  lat: -33.4145,
  lng: -70.5983
}

export function LocationPicker({ onDireccionChange }: LocationPickerProps) {
  const [position, setPosition] = useState(defaultCenter)
  const [mapType, setMapType] = useState<string>('hybrid')
  const [zoom, setZoom] = useState(16)
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
  })

  const handleMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    updateLocation(lat, lng)
  }, [])

  const updateLocation = async (lat: number, lng: number) => {
    setPosition({ lat, lng })

    try {
      const geocoder = new google.maps.Geocoder()
      const response = await geocoder.geocode({ location: { lat, lng } })
      
      if (response.results[0]) {
        const address = response.results[0].formatted_address
        onDireccionChange(address, { lat, lng })
      }
    } catch (error) {
      console.error('Error getting address:', error)
    }
  }

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          updateLocation(lat, lng)
          setZoom(18)
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  const toggleMapType = () => {
    setMapType(current => 
      current === 'hybrid' 
        ? 'roadmap' 
        : 'hybrid'
    )
  }

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden border">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={toggleMapType}
          className="bg-white/90 hover:bg-white"
        >
          <MapIcon className="h-4 w-4 mr-2" />
          {mapType === 'hybrid' ? 'Mapa' : 'Satélite'}
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleMyLocation}
          className="bg-white/90 hover:bg-white"
        >
          <Locate className="h-4 w-4 mr-2" />
          Mi Ubicación
        </Button>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={zoom}
        onClick={handleMapClick}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          mapTypeId: mapType,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
          }
        }}
      >
        <Marker 
          position={position}
          animation={google.maps.Animation.DROP}
        />
      </GoogleMap>
    </div>
  )
}