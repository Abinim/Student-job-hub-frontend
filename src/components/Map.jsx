import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Spinner,
  Text,
} from '@chakra-ui/react';

const Map = ({ apiKey }) => {
  const mapContainerRef = useRef(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [travelMode, setTravelMode] = useState('DRIVING'); // Set default travel mode
  const [duration, setDuration] = useState('');
  const [legs, setLegs] = useState([]);

  const originAutocompleteRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places', 'directions'],
    });

    loader.load().then(() => {
      const map = new window.google.maps.Map(mapContainerRef.current, {
        zoom: 12,
        center: { lat: 0, lng: 0 },
      });
      setDirectionsService(new window.google.maps.DirectionsService());
      setDirectionsRenderer(new window.google.maps.DirectionsRenderer({ map }));

      // Initialize autocomplete for origin and destination inputs
      const originAutocomplete = new window.google.maps.places.Autocomplete(
        originAutocompleteRef.current
      );
      originAutocomplete.setFields(['formatted_address', 'geometry']);
      originAutocomplete.addListener('place_changed', () => {
        const place = originAutocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;
        setOrigin(place.formatted_address);
      });

      const destinationAutocomplete =
        new window.google.maps.places.Autocomplete(
          destinationAutocompleteRef.current
        );
      destinationAutocomplete.setFields(['formatted_address', 'geometry']);
      destinationAutocomplete.addListener('place_changed', () => {
        const place = destinationAutocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;
        setDestination(place.formatted_address);
      });
    });
  }, [apiKey]);

  const handleSearch = () => {
    if (!origin || !destination) {
      alert('Please enter both origin and destination');
      return;
    }

    setLoading(true);

    directionsService.route(
      {
        origin,
        destination,
        travelMode,
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          const route = response.routes[0];
          const totalDuration = route.legs.reduce(
            (acc, leg) => acc + leg.duration.value,
            0
          );
          const hours = Math.floor(totalDuration / 3600);
          const minutes = Math.floor((totalDuration % 3600) / 60);
          setDuration(`${hours} hours ${minutes} minutes`);

          setLegs(
            route.legs.map(leg => ({
              duration: leg.duration.text,
              mode: leg.steps[0].travel_mode,
              transitDetails: leg.steps[0].transit || null,
            }))
          );
        } else {
          alert('Directions request failed due to ' + status);
        }
        setLoading(false);
      }
    );
  };

  return (
    <Flex justifyContent='center' alignItems='center' h='100vh'>
      <Box
        borderWidth='1px'
        borderRadius='25px'
        overflow='hidden'
        boxShadow='lg'
        p={8}
        maxWidth='800px'
        width='100%'
        bg='#219ebc'
        color='white'
        zIndex='10'
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Origin</FormLabel>
            <Input
              ref={originAutocompleteRef}
              value={origin}
              onChange={e => setOrigin(e.target.value)}
              placeholder='Enter origin'
              autoComplete='off'
              style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Destination</FormLabel>
            <Input
              ref={destinationAutocompleteRef}
              value={destination}
              onChange={e => setDestination(e.target.value)}
              placeholder='Enter destination'
              autoComplete='off'
              style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            />
          </FormControl>
          <Button
            colorScheme='teal'
            onClick={handleSearch}
            isLoading={loading}
            style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            color={'red'}
          >
            {loading ? 'Loading...' : 'Get Directions'}
          </Button>
          {duration && (
            <Text fontSize='lg' fontWeight='bold'>
              Duration: {duration}
            </Text>
          )}
          {legs.length > 0 && (
            <>
              <Text fontSize='lg' fontWeight='bold'>
                Steps:
              </Text>
              <ul>
                {legs.map((leg, index) => (
                  <li key={index}>
                    {leg.duration} - {leg.mode}
                    {leg.transitDetails && (
                      <span> - {leg.transitDetails.line.short_name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Stack>
        <Box ref={mapContainerRef} h='400px' w='100%' mt={4} />
      </Box>
    </Flex>
  );
};

export default Map;
