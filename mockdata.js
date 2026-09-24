export const AREAS = ['Viman Nagar', 'Kharadi', 'Koregaon Park', 'Hinjawadi', 'Baner']

export const LOCATIONS = [
  {
    id: 'loc-1',
    name: 'Phoenix Marketcity Deck A',
    area: 'Viman Nagar',
    address: 'Near Phoenix Marketcity, Viman Nagar',
    distanceKm: 0.8,
    totalSlots: 120,
    availableSlots: 35,
    pricePerHour: 30,
    rating: 4.8,
    type: 'Multi-level, covered',
    hours: '6:00 AM – 12:00 AM',
    lat: 18.5679,
    lng: 73.9143,
    amenities: ['EV charging', 'CCTV', 'Valet on request'],
    accepts: ['Car', 'SUV', 'EV Car', 'Bike'],
  },
  {
    id: 'loc-2',
    name: 'EON Free Zone Smart Hub',
    area: 'Kharadi',
    address: 'EON Free Zone Road, Kharadi',
    distanceKm: 1.2,
    totalSlots: 80,
    availableSlots: 18,
    pricePerHour: 25,
    rating: 4.9,
    type: 'Automated tower',
    hours: '24 hours',
    lat: 18.5515,
    lng: 73.9521,
    amenities: ['Fast EV charger', 'Sensor guided', 'Security'],
    accepts: ['Car', 'SUV', 'EV Car'],
  },
  {
    id: 'loc-3',
    name: 'North Main Road Plaza',
    area: 'Koregaon Park',
    address: 'North Main Road, Koregaon Park',
    distanceKm: 1.5,
    totalSlots: 200,
    availableSlots: 74,
    pricePerHour: 40,
    rating: 4.6,
    type: 'Open surface lot',
    hours: '7:00 AM – 11:00 PM',
    lat: 18.5362,
    lng: 73.8940,
    amenities: ['CCTV', 'On-site guard'],
    accepts: ['Car', 'SUV', 'Bike'],
  },
  {
    id: 'loc-4',
    name: 'Hinjawadi Phase 2 Campus Bay',
    area: 'Hinjawadi',
    address: 'Rajiv Gandhi Infotech Park, Phase 2',
    distanceKm: 2.4,
    totalSlots: 150,
    availableSlots: 6,
    pricePerHour: 20,
    rating: 4.4,
    type: 'Campus dedicated',
    hours: '6:00 AM – 10:00 PM',
    lat: 18.5908,
    lng: 73.7392,
    amenities: ['Shuttle pickup', 'Covered'],
    accepts: ['Car', 'Bike'],
  },
]

export const INITIAL_VEHICLES = [
  { id: 'v-1', number: 'MH 12 AB 1234', type: 'Car', brand: 'Hyundai', model: 'Creta', color: 'Polar White', isDefault: true },
]

export const SEED_HISTORY = [
  { id: 'PS-77140', locationId: 'loc-2', location: 'EON Free Zone Smart Hub', slot: 'B4', date: '18 Sep 2026', hours: 3, amount: 75, vehicle: 'MH 12 AB 1234', status: 'Completed' },
  { id: 'PS-60328', locationId: 'loc-1', location: 'Phoenix Marketcity Deck A', slot: 'A9', date: '11 Sep 2026', hours: 2, amount: 60, vehicle: 'MH 12 AB 1234', status: 'Completed' },
  { id: 'PS-55190', locationId: 'loc-3', location: 'North Main Road Plaza', slot: 'C2', date: '02 Sep 2026', hours: 2, amount: 80, vehicle: 'MH 12 AB 1234', status: 'Completed' },
]

// Deterministic slot grid generator so the layout is stable across renders
export function generateSlots(locationId) {
  const rows = ['A', 'B', 'C', 'D']
  const slots = []
  rows.forEach((row) => {
    for (let i = 1; i <= 9; i++) {
      const seed = (row.charCodeAt(0) * 7 + i * 3 + locationId.length) % 10
      let status = 'available'
      if (seed < 3) status = 'occupied'
      else if (seed === 3) status = 'reserved'
      slots.push({
        code: `${row}${i}`,
        row,
        num: i,
        status,
        isEv: row === 'A' && i <= 2,
      })
    }
  })
  return slots
}
